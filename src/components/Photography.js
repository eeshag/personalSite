import React from 'react';
import { Link } from 'react-router-dom';
import { photography } from '../data/siteData';
import './Photography.css';

const Photography = () => {
  const photosNewestFirst = [...photography].sort(
    (left, right) => new Date(right.date) - new Date(left.date)
  );

  return (
    <div className="photography-page">
      <div className="photography-header">
        <h1 className="photography-title">Photography</h1>
      </div>

      <div className="photography-grid">
        {photosNewestFirst.map((item) => (
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
    </div>
  );
};

export default Photography;
