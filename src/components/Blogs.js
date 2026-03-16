import React from 'react';
import { Link } from 'react-router-dom';
import { blogs } from '../data/siteData';
import './Blogs.css';

const Blogs = () => {
  const blogsNewestFirst = [...blogs].sort((left, right) => new Date(right.date) - new Date(left.date));

  return (
    <div className="blogs-page">
      <div className="blogs-header">
        <h1 className="blogs-title">Blogs</h1>
      </div>

      <div className="blogs-grid">
        {blogsNewestFirst.map((blog) => (
          <Link key={blog.id} to={`/blogs/${blog.slug}`} className="blog-card">
            <div className="blog-card-square" style={{ backgroundColor: blog.color }}>
              <span className="blog-card-icon">{blog.icon}</span>
            </div>
            <div className="blog-card-title">{blog.title}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
