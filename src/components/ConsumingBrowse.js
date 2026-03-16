import React from 'react';
import { Link } from 'react-router-dom';
import { currentlyConsuming } from '../data/content';
import './ConsumingBrowse.css';

const CONSUMING_COLORS = ['#EC4899', '#10B981', '#8B5CF6', '#06B6D4', '#F59E0B', '#6366F1'];

const ConsumingBrowse = ({ onNavigate }) => {
  return (
    <div className="consuming-browse-page">
      <h1 className="consuming-browse-title">Browse all</h1>
      <div className="consuming-browse-grid">
        {currentlyConsuming.map((category, index) => {
          const color = CONSUMING_COLORS[index % CONSUMING_COLORS.length];
          const slug = category.slug || category.title.toLowerCase().replace(/\s+&\s+/g, '-').replace(/\s+/g, '-');
          return (
            <Link
              key={category.id}
              to={`/consuming/${slug}`}
              className="consuming-browse-card"
              style={{ backgroundColor: color }}
              onClick={(e) => onNavigate && onNavigate(`consuming-${category.id}`, { ...category, slug })}
            >
              <span className="consuming-browse-card-title">{category.title}</span>
              <span className="consuming-browse-card-cover" aria-hidden="true">
                {category.cover}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ConsumingBrowse;
