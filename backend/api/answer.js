const path = require('node:path');
const { pathToFileURL } = require('node:url');

const normalize = (value) => String(value || '').trim().toLowerCase();
const tokenize = (value) => normalize(value).split(/\s+/).filter(Boolean);

const getAllowedOrigins = () =>
  String(process.env.ALLOWED_ORIGINS || 'http://localhost:3000')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

const applyCors = (req, res) => {
  const requestOrigin = req.headers.origin;
  const allowedOrigins = getAllowedOrigins();
  const allowOrigin = requestOrigin && allowedOrigins.includes(requestOrigin)
    ? requestOrigin
    : allowedOrigins[0] || 'http://localhost:3000';

  res.setHeader('Access-Control-Allow-Origin', allowOrigin);
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
};

const buildDocuments = (siteContent) => {
  const documents = [siteContent.aboutPage, ...siteContent.projects, ...siteContent.blogs].map((item) => ({
    id: `${item.type}-${item.id}`,
    type: item.type,
    title: item.title || item.name,
    url: item.url,
    slug: item.slug || '',
    summary: item.summary || item.excerpt || '',
    keywords: item.keywords || [],
    fullText: item.fullText || ''
  }));

  return documents;
};

const scoreDocument = (document, query, currentPath = '') => {
  const normalizedQuery = normalize(query);
  if (!normalizedQuery) return 0;

  const tokens = tokenize(normalizedQuery);
  const title = normalize(document.title);
  const slug = normalize(document.slug);
  const summary = normalize(document.summary);
  const fullText = normalize(document.fullText);
  const keywords = document.keywords.map(normalize).join(' ');

  let score = 0;

  if (title === normalizedQuery) score += 120;
  if (title.startsWith(normalizedQuery)) score += 70;
  if (title.includes(normalizedQuery)) score += 55;
  if (slug === normalizedQuery) score += 70;
  if (slug.includes(normalizedQuery)) score += 35;
  if (summary.includes(normalizedQuery)) score += 30;
  if (keywords.includes(normalizedQuery)) score += 30;
  if (fullText.includes(normalizedQuery)) score += 18;

  score += tokens.reduce((total, token) => total + (title.includes(token) ? 16 : 0), 0);
  score += tokens.reduce((total, token) => total + (summary.includes(token) ? 9 : 0), 0);
  score += tokens.reduce((total, token) => total + (keywords.includes(token) ? 10 : 0), 0);
  score += tokens.reduce((total, token) => total + (fullText.includes(token) ? 4 : 0), 0);

  if (currentPath && document.url === currentPath) score += 14;

  return score;
};

const loadSiteContent = async () => {
  const siteContentUrl = pathToFileURL(path.join(__dirname, '..', '..', 'shared', 'siteContent.mjs')).href;
  return import(siteContentUrl);
};

const extractOutputText = (payload) => {
  if (typeof payload.output_text === 'string' && payload.output_text.trim()) {
    return payload.output_text.trim();
  }

  if (!Array.isArray(payload.output)) return '';

  const textParts = [];
  payload.output.forEach((item) => {
    if (!Array.isArray(item.content)) return;
    item.content.forEach((contentItem) => {
      if (contentItem.type === 'output_text' && contentItem.text) {
        textParts.push(contentItem.text);
      }
    });
  });

  return textParts.join('\n').trim();
};

const summarizeDocument = (document) => {
  const summary = String(document.summary || '').trim();
  if (summary) return summary;

  const fullText = String(document.fullText || '').replace(/\s+/g, ' ').trim();
  if (!fullText) return '';

  const firstSentence = fullText.split(/(?<=[.!?])\s+/)[0];
  return firstSentence || fullText.slice(0, 180);
};

const STOPWORDS = new Set(['what', 'is', 'are', 'the', 'a', 'an', 'about', 'tell', 'me', 'describe', 'who', 'where', 'when', 'how', 'why']);
const getQueryFocus = (query) =>
  tokenize(query).filter((t) => !STOPWORDS.has(t)).join(' ');

const queryMatchesDocument = (query, document) => {
  const focus = getQueryFocus(query);
  if (!focus) return false;
  const title = normalize(document.title);
  const slug = normalize(document.slug);
  return title.includes(focus) || slug.includes(focus) || focus.includes(title) || focus.includes(slug);
};

const buildFallbackAnswer = (query, rankedDocuments) => {
  if (!rankedDocuments.length) {
    return `I could not find a clear answer to "${query}" on the site yet.`;
  }

  const focus = getQueryFocus(query);
  const matchingDoc = focus
    ? rankedDocuments.find((doc) => queryMatchesDocument(query, doc))
    : null;
  const top = rankedDocuments[0];
  const second = rankedDocuments[1];
  const useSingle =
    matchingDoc ||
    !second ||
    (second && top.score >= 1.5 * second.score);

  const documentsToUse = useSingle
    ? [matchingDoc || top]
    : rankedDocuments.slice(0, 3);
  const summaries = documentsToUse
    .map((document) => {
      const summary = summarizeDocument(document);
      if (!summary) return '';
      return `${document.title}: ${summary}`;
    })
    .filter(Boolean);

  if (!summaries.length) {
    return `I found relevant pages for "${query}", but there is not enough detail on the site yet to answer confidently.`;
  }

  return `Based on the site, ${summaries.join(' ')}`;
};

const createResponse = (req, res, statusCode, payload) => {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  applyCors(req, res);
  res.end(JSON.stringify(payload));
};

const parseRequestBody = async (req) => {
  if (typeof req.body === 'object' && req.body !== null) return req.body;
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }

  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }

  if (!chunks.length) return {};

  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf8'));
  } catch {
    return {};
  }
};

module.exports = async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    applyCors(req, res);
    res.end();
    return;
  }

  if (req.method !== 'POST') {
    createResponse(req, res, 405, { error: 'Method not allowed' });
    return;
  }

  try {
    const siteContent = await loadSiteContent();
    const documents = buildDocuments(siteContent);
    const body = await parseRequestBody(req);
    const query = String(body?.query || '').trim();
    const currentPath = String(body?.currentPath || '').trim();

    if (!query) {
      createResponse(req, res, 400, { error: 'Missing query' });
      return;
    }

    const rankedDocuments = documents
      .map((document) => ({ ...document, score: scoreDocument(document, query, currentPath) }))
      .filter((document) => document.score > 0)
      .sort((left, right) => right.score - left.score)
      .slice(0, 4);

    const queryFocus = getQueryFocus(query);
    const singleMatch = queryFocus
      ? rankedDocuments.find((doc) => queryMatchesDocument(query, doc))
      : null;
    const contextDocuments = singleMatch ? [singleMatch] : rankedDocuments;

    const links = rankedDocuments.map((document) => ({
      label: document.title,
      url: document.url,
      type: document.type
    }));

    if (!process.env.OPENAI_API_KEY) {
      createResponse(req, res, 200, {
        answer: buildFallbackAnswer(query, rankedDocuments),
        links,
        sources: links,
        model: 'fallback'
      });
      return;
    }

    const contextBlock = contextDocuments
      .map((document, index) => `${index + 1}. ${document.title} (${document.type}, ${document.url})\nSummary: ${document.summary}\nDetails: ${document.fullText}`)
      .join('\n\n');

    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-5-nano',
        max_output_tokens: 220,
        input: [
          {
            role: 'system',
            content: [
              {
                type: 'input_text',
                text: 'You are the assistant for Eesha\'s personal website. Answer only from the provided site context. If the user asks about a specific project, topic, or page, answer only about that—do not list or describe other projects or pages unless they asked for a list or comparison. Keep answers concise, factual, and helpful. If the context is not enough, say so clearly. Do not invent facts. Do not mention sources inline unless helpful.'
              }
            ]
          },
          {
            role: 'user',
            content: [
              {
                type: 'input_text',
                text: `User question: ${query}\n\nCurrent path: ${currentPath || '/'}\n\nRelevant site context:\n${contextBlock}`
              }
            ]
          }
        ]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      createResponse(req, res, 502, {
        error: 'OpenAI request failed',
        detail: errorText,
        answer: buildFallbackAnswer(query, rankedDocuments),
        links,
        sources: links,
        model: 'fallback'
      });
      return;
    }

    const payload = await response.json();
    const answer = extractOutputText(payload) || buildFallbackAnswer(query, rankedDocuments);

    createResponse(req, res, 200, {
      answer,
      links,
      sources: links,
      model: process.env.OPENAI_MODEL || 'gpt-5-nano'
    });
  } catch (error) {
    createResponse(req, res, 500, {
      error: 'Internal server error',
      detail: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};
