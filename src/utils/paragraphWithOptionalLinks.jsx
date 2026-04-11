import React from 'react';
import { Link } from 'react-router-dom';

/** Renders optional [label](/path) markdown inline links as React Router links. */
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
    parts.push(
      <Link
        key={`${paragraphIndex}-${match.index}`}
        to={match[2]}
        className="content-inline-link"
      >
        {match[1]}
      </Link>
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
