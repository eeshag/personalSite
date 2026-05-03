import React, { useEffect, useState } from 'react';

const AI_ENDPOINT = import.meta.env.DEV
  ? '/api/answer'
  : import.meta.env.VITE_SITE_AI_API_URL || '/api/answer';

const SearchAnswerCard = ({ query, currentPath = '/' }) => {
  const [state, setState] = useState({ status: 'idle', data: null, error: '' });

  useEffect(() => {
    const trimmedQuery = String(query || '').trim();
    if (!trimmedQuery) {
      setState({ status: 'idle', data: null, error: '' });
      return undefined;
    }

    const controller = new AbortController();

    const fetchAnswer = async () => {
      setState({ status: 'loading', data: null, error: '' });
      try {
        const response = await fetch(AI_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: trimmedQuery, currentPath }),
          signal: controller.signal
        });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        setState({ status: 'success', data: payload, error: '' });
      } catch (error) {
        if (controller.signal.aborted) return;
        setState({
          status: 'error',
          data: null,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    };

    fetchAnswer();

    return () => controller.abort();
  }, [currentPath, query]);

  if (!query.trim()) return null;

  return (
    <section className="search-answer-card" aria-live="polite">
      <div className="search-answer-card-header">
        <div>
          <p className="search-answer-card-eyebrow">AI Answer</p>
          <h2 className="search-answer-card-title">Powered by GPT-5.1 nano</h2>
        </div>
      </div>

      {state.status === 'loading' && (
        <p className="search-answer-card-copy">Thinking through your question and matching it to the most relevant pages.</p>
      )}

      {state.status === 'error' && (
        <p className="search-answer-card-copy">
          AI answer unavailable right now. The relevant pages are still listed below.
        </p>
      )}

      {state.status === 'success' && state.data && (
        <>
          <p className="search-answer-card-copy">{state.data.answer}</p>
          {Array.isArray(state.data.links) && state.data.links.length > 0 && (
            <div className="search-answer-links">
              {state.data.links.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  className="search-answer-link-chip"
                  target="_blank"
                  rel="noreferrer"
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default SearchAnswerCard;
