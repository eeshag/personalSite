import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { photography } from '../data/siteData';
import './Photography.css';

const PHOTOGRAPHY_SECTIONS = [
  { key: 'flowers', label: 'Flowers' },
  { key: 'sunsets', label: 'Sunsets' },
  { key: 'workshops', label: 'Workshops' }
];

const Photography = () => {
  const sectionsWithItems = useMemo(() => {
    const byDate = (left, right) => new Date(right.date) - new Date(left.date);
    return PHOTOGRAPHY_SECTIONS.map(({ key, label }) => ({
      key,
      label,
      items: photography.filter((item) => item.section === key).sort(byDate)
    })).filter((section) => section.items.length > 0);
  }, []);

  return (
    <div className="photography-page">
      <div className="photography-header">
        <h1 className="photography-title">Photography</h1>
      </div>

      {sectionsWithItems.map((section) => (
        <section key={section.key} className="photography-section" aria-labelledby={`photography-section-${section.key}`}>
          <h2 id={`photography-section-${section.key}`} className="photography-section-title">
            {section.label}
          </h2>
          <div className="photography-grid">
            {section.items.map((item) => (
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
        </section>
      ))}
    </div>
  );
};

export default Photography;
