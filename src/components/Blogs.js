import React from 'react';
import { blogs } from '../data/blogs';
import './Blogs.css';

const Blogs = ({ onNavigate }) => {
  const handleBlogClick = (blog) => {
    if (onNavigate) {
      onNavigate(`blog-${blog.id}`, blog);
      return;
    }
    if (blog.url && blog.url !== '#') {
      window.open(blog.url, '_blank');
    }
  };

  return (
    <div className="blogs-page">
      <div className="blogs-header">
        <h1 className="blogs-title">Blogs</h1>
      </div>

      <div className="blogs-grid">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="blog-card"
            onClick={() => handleBlogClick(blog)}
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                handleBlogClick(blog);
              }
            }}
          >
            <div
              className="blog-card-square"
              style={{ backgroundColor: blog.color }}
            >
              <span className="blog-card-icon">{blog.icon}</span>
            </div>
            <div className="blog-card-title">{blog.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
