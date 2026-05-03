import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { photography } from '../data/siteData';
import './Photography.css';

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'favorites', label: 'Favorites' },
  { id: 'flowers', label: 'Flowers' },
  { id: 'sunsets', label: 'Sunsets' },
  { id: 'other', label: 'Other' }
];

const Photography = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredItems = useMemo(() => {
    const byDate = (left, right) => new Date(right.date) - new Date(left.date);
    const list =
      activeFilter === 'all'
        ? [...photography]
        : activeFilter === 'favorites'
          ? photography.filter((item) => item.favorite)
          : photography.filter((item) => item.section === activeFilter);
    return list.sort(byDate);
  }, [activeFilter]);

  return (
    <div className="photography-page">
      <div className="photography-header">
        <h1 className="photography-title">Photography</h1>
      </div>

      <div className="photography-filters">
        {FILTERS.map((filter) => (
          <button
            key={filter.id}
            type="button"
            className={`photography-filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
            onClick={() => setActiveFilter(filter.id)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {filteredItems.length > 0 ? (
        <div className="photography-grid">
          {filteredItems.map((item) => (
            <Link key={item.id} to={`/photography/${item.slug}`} className="photography-card">
              <div
                className="photography-card-square"
                style={item.image ? undefined : { backgroundColor: item.color }}
              >
                {item.image ? (
                  <img
                    src={item.image}
                    alt=""
                    className="photography-card-image"
                    loading="lazy"
                  />
                ) : (
                  <span className="photography-card-icon">{item.icon}</span>
                )}
              </div>
              <div className="photography-card-title">{item.title}</div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="photography-empty">No photos in this category yet.</p>
      )}
    </div>
  );
};

export default Photography;
