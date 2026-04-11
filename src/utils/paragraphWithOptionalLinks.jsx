import React from 'react';
import { Link } from 'react-router-dom';

/** Renders optional [label](url) markdown: internal paths use React Router; http(s) opens in a new tab. */
export function paragraphWithOptionalLinks(text, paragraphIndex) {
  const re = /\[([^\]]+)\]\(([^)]+)\)/g;
  const matches = [...text.matchAll(re)];
  if (matches.length === 0) {
    return text;
  }

  const parts = [];
  let last = 0;
  for (const match of matches) {
    if (match.index > last) {
      parts.push(text.slice(last, match.index));
    }
    const href = match[2];
    const isExternal = /^https?:\/\//i.test(href);
    parts.push(
      isExternal ? (
        <a
          key={`${paragraphIndex}-${match.index}`}
          href={href}
          className="content-inline-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          {match[1]}
        </a>
      ) : (
        <Link
          key={`${paragraphIndex}-${match.index}`}
          to={href}
          className="content-inline-link"
        >
          {match[1]}
        </Link>
      )
    );
    last = match.index + match[0].length;
  }
  if (last < text.length) {
    parts.push(text.slice(last));
  }
  return parts;
}

/** Plain text for word count / TTS: keeps link text, drops URLs. */
export function stripInlineMarkdownLinks(text) {
  if (!text) return '';
  return text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
}
