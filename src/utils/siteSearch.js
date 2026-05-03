import { searchDocuments, suggestedQuestions } from '../data/siteData';

const normalize = (value) => String(value || '').trim().toLowerCase();

const tokenize = (value) => normalize(value).split(/\s+/).filter(Boolean);

const countTokenMatches = (haystack, tokens, weight) =>
  tokens.reduce((score, token) => (haystack.includes(token) ? score + weight : score), 0);

const getDocumentTypeLabel = (type) => {
  if (type === 'about') return 'Page';
  if (type === 'photography') return 'Photo set';
  return type ? type[0].toUpperCase() + type.slice(1) : 'Page';
};

const scoreDocument = (document, query, currentPath = '') => {
  const normalizedQuery = normalize(query);
  if (!normalizedQuery) return 0;

  const tokens = tokenize(normalizedQuery);
  const title = normalize(document.title || document.name);
  const slug = normalize(document.slug);
  const summary = normalize(document.summary || document.excerpt);
  const fullText = normalize(document.fullText);
  const keywords = (document.keywords || []).map(normalize).join(' ');
  const url = normalize(document.url);

  let score = 0;

  if (title === normalizedQuery) score += 120;
  if (title.startsWith(normalizedQuery)) score += 70;
  if (title.includes(normalizedQuery)) score += 55;
  if (slug === normalizedQuery) score += 70;
  if (slug.includes(normalizedQuery)) score += 35;
  if (summary.includes(normalizedQuery)) score += 30;
  if (keywords.includes(normalizedQuery)) score += 30;
  if (fullText.includes(normalizedQuery)) score += 18;

  score += countTokenMatches(title, tokens, 16);
  score += countTokenMatches(summary, tokens, 9);
  score += countTokenMatches(keywords, tokens, 10);
  score += countTokenMatches(fullText, tokens, 4);

  if (currentPath && url && currentPath === url) score += 14;

  return score;
};

export const searchSiteContent = (query, options = {}) => {
  const { currentPath = '', limit = 20, includeConsuming = true } = options;
  const normalizedQuery = normalize(query);
  if (!normalizedQuery) return [];

  const filteredDocuments = includeConsuming
    ? searchDocuments
    : searchDocuments.filter((document) => document.type !== 'consuming');

  return filteredDocuments
    .map((document) => ({
      ...document,
      score: scoreDocument(document, normalizedQuery, currentPath)
    }))
    .filter((document) => document.score > 0)
    .sort((left, right) => right.score - left.score)
    .slice(0, limit);
};

export const getSearchResultGroups = (query, options = {}) => {
  const results = searchSiteContent(query, options);

  return {
    results,
    showAboutMe: results.some((item) => item.type === 'about'),
    projects: results.filter((item) => item.type === 'project'),
    blogs: results.filter((item) => item.type === 'blog'),
    photography: results.filter((item) => item.type === 'photography'),
    currentlyConsuming: results.filter((item) => item.type === 'consuming')
  };
};

export const getTypeaheadSuggestions = (query) => {
  const normalizedQuery = normalize(query);
  if (!normalizedQuery) {
    return suggestedQuestions.slice(0, 4).map((question, index) => ({
      id: `question-${index}`,
      type: 'question',
      label: question,
      value: question,
      description: 'Suggested question'
    }));
  }

  const pageSuggestions = searchSiteContent(query, {
    limit: 4,
    includeConsuming: false
  }).map((item) => ({
    id: `${item.type}-${item.id}`,
    type: 'page',
    label: item.title || item.name,
    value: item.title || item.name,
    description: getDocumentTypeLabel(item.type),
    url: item.url
  }));

  const questionSuggestions = suggestedQuestions
    .filter((question) => normalize(question).includes(normalizedQuery))
    .slice(0, 2)
    .map((question, index) => ({
      id: `matching-question-${index}`,
      type: 'question',
      label: question,
      value: question,
      description: 'Suggested question'
    }));

  const askSuggestion = {
    id: 'ask-current-query',
    type: 'ask',
    label: `Ask: ${query.trim()}`,
    value: query.trim(),
    description: 'Get an AI answer and related pages'
  };

  return [askSuggestion, ...pageSuggestions, ...questionSuggestions].slice(0, 6);
};
