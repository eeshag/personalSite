import React, { useEffect, useRef, useState } from 'react';
import './Projects.css';

const BlogDetail = ({ blog }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const contentRef = useRef(null);

  const getBlogContent = () => {
    if (!blog) return [];

    if (blog.id === 1 && blog.title === 'Cats') {
      return [
        {
          type: 'paragraph',
          content:
            'Cats are my favorite animal, which if I told my younger self that, she would have been shocked, because I didn’t like cats AT ALL back then. When I was younger, cats used to terrify me, even though I had never actually met a pet cat. There were strays that would come into our backyard or be on the street, and they never actually did anything bad but somehow I couldn’t shake the image that cats were evil, scary creatures out of my head.'
        },
        {
          type: 'paragraph',
          content:
            'I think I felt this way because I had met multiple dogs in the past, and I definitely was not a dog person, so I assumed I wouldn’t like cats either. In general, I hadn’t met any animal that I liked, or wasn’t scared of, so I just assumed I wasn’t an animal person, at all.'
        },
        {
          type: 'paragraph',
          content:
            'That all changed this thanksgiving break though, when my brother decided to foster a kitten for a month. Her name was Mushroom and I had seen her over face time. I couldn’t lie, she was adorable, but I was still terrified to go visit her, since we were going to see my brother in Philly over thanksgiving break.'
        },
        {
          type: 'paragraph',
          content:
            'Honestly, I shouldn’t have been scared, because Mushroom was adorable. The only thing you needed to be scared of was her claws, because you will get scratched. She grows on you so fast though, that you don’t even mind. Other than that, she was amazing. She loved playing with you and her toys, she loved jumping on you, and she was so curious. One time, my brother had a paper bag on the floor from when we had gone shopping the night before (haha rhyme) and she kept on trying to look in the bag before just submerging herself in the bag and staying there for a while. On top of this, it\'s so entertaining seeing her map out her path of how she\'s going to get around my brother\'s room, and then watch her execute it perfectly. She can jump up the couch, over my brother\'s backpack, onto the night stand and then onto my brother\'s bed. It\'s even cool seeing them squeeze into small spaces effortlessly, like in between my brother\'s couch or nightstand, under a chair or under the bed. I also find it funny how sensitive their ears are, if you make one noise they are automatically looking in that direction and I loved how she followed my brother around. If my brother was choosing clothes from his closet, she was next to him. If he was holding a box, she was trying to grab it. A couple of times, she actually got pretty close to grabbing it, she can jump so high.'
        },
        {
          type: 'paragraph',
          content:
            'In conclusion, Mushroom taught me to never judge a book by its cover. I use to be scared of cats because of assumptions I had made in my head, but now they are my favorite animal, and I want a cat myself 😺'
        }
      ];
    }

    return [
      {
        type: 'paragraph',
        content: `This is a detailed view of "${blog.title}". Content will be added here soon.`
      }
    ];
  };

  const blogContent = getBlogContent();
  const blogImages =
    blog && blog.id === 1
      ? [
          `${process.env.PUBLIC_URL}/cats-1.jpg`,
          `${process.env.PUBLIC_URL}/cats-2.jpg`,
          `${process.env.PUBLIC_URL}/cats-3.jpg`
        ]
      : [];

  const calculateWordCount = () => {
    let count = 0;
    blogContent.forEach((item) => {
      if (item.type === 'paragraph') {
        count += item.content.split(/\s+/).length;
      } else if (item.type === 'list') {
        item.items.forEach((itemText) => {
          count += itemText.split(/\s+/).length;
        });
      } else if (item.type === 'header') {
        count += item.content.split(/\s+/).length;
      }
    });
    return count;
  };

  const wordCount = calculateWordCount();
  const readingTime = Math.ceil(wordCount / 100);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      const scrollableHeight = documentHeight - windowHeight;
      const progress = scrollableHeight > 0 ? (scrollTop / scrollableHeight) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) {
      return dateString;
    }
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const currentTime = Math.floor((scrollProgress / 100) * readingTime * 60);
  const totalTime = readingTime * 60;

  if (!blog) {
    return null;
  }

  const hexToRgba = (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  return (
    <div className="projects-page" ref={contentRef}>
      <div
        className="banner-section"
        style={{
          background: `linear-gradient(180deg, ${hexToRgba(blog.color, 0.4)} 0%, ${hexToRgba(blog.color, 0.6)} 100%)`
        }}
      >
        <div className="banner-content">
          <div className="cover-square" style={{ backgroundColor: blog.color }}>
            <span className="cover-icon">{blog.icon}</span>
          </div>

          <div className="banner-text">
            <p className="banner-metadata">Public Article</p>
            <h1 className="banner-title">{blog.title}</h1>
            <p className="banner-metadata">
              Author: Eesha Gupta, {wordCount} words, {readingTime} minute read
            </p>
          </div>
        </div>
      </div>

      <div className="content-section">
        <div className="content-header">
          <div className="header-number">#</div>
          <div className="header-title">Title</div>
          <div className="header-date">Date added: {formatDate(blog.date)}</div>
        </div>
        <div className="header-divider"></div>

        <div className="writing-area">
          {blogContent.map((item, index) => {
            const prevItem = index > 0 ? blogContent[index - 1] : null;
            const nextItem = index < blogContent.length - 1 ? blogContent[index + 1] : null;
            const isHeader = item.type === 'header';
            const isFirstInSection = prevItem && prevItem.type === 'header';
            const isLastInSection = nextItem && nextItem.type === 'header';
            const showImages = blogImages.length > 0 && index === 0;

            const rowPaddingTop = isHeader ? (index === 0 ? '0px' : '16px') : isFirstInSection ? '2px' : '1px';
            const rowPaddingBottom = isLastInSection ? '0px' : '0px';

            if (item.type === 'header') {
              return (
                <div
                  key={index}
                  className="writing-row"
                  style={{ paddingTop: rowPaddingTop, paddingBottom: rowPaddingBottom }}
                >
                  <div className="row-number">{index + 1}</div>
                  <div className="row-content">
                    <h2
                      className="content-paragraph"
                      style={{ fontWeight: 'bold', color: '#ffffff', fontSize: '20px', marginTop: '0', marginBottom: '0' }}
                    >
                      {item.content}
                    </h2>
                  </div>
                  <div className="row-date">
                    {showImages && (
                      <div className="blog-date-images">
                        {blogImages.map((imageSrc) => (
                          <img
                            key={imageSrc}
                            className="blog-date-image"
                            src={imageSrc}
                            alt="Cats blog"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            }

            if (item.type === 'list') {
              return (
                <div
                  key={index}
                  className="writing-row"
                  style={{ paddingTop: rowPaddingTop, paddingBottom: rowPaddingBottom }}
                >
                  <div className="row-number">{index + 1}</div>
                  <div className="row-content">
                    <ul style={{ margin: '0', paddingLeft: '24px', color: '#b3b3b3' }}>
                      {item.items.map((listItem, listIndex) => (
                        <li
                          key={listIndex}
                          className="content-paragraph"
                          style={{ marginBottom: listIndex < item.items.length - 1 ? '2px' : '0' }}
                        >
                          {listItem}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="row-date">
                    {showImages && (
                      <div className="blog-date-images">
                        {blogImages.map((imageSrc) => (
                          <img
                            key={imageSrc}
                            className="blog-date-image"
                            src={imageSrc}
                            alt="Cats blog"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            }

            return (
              <div
                key={index}
                className="writing-row"
                style={{ paddingTop: rowPaddingTop, paddingBottom: rowPaddingBottom }}
              >
                <div className="row-number">{index + 1}</div>
                <div className="row-content">
                  <p className="content-paragraph" style={{ margin: '0' }}>
                    {item.content}
                  </p>
                </div>
                <div className="row-date">
                  {showImages && (
                    <div className="blog-date-images">
                      {blogImages.map((imageSrc) => (
                        <img
                          key={imageSrc}
                          className="blog-date-image"
                          src={imageSrc}
                          alt="Cats blog"
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="player-bar">
        <div className="player-left">
          <div className="player-cover" style={{ backgroundColor: blog.color }}>
            <span className="player-icon">{blog.icon}</span>
          </div>
          <div className="player-info">
            <div className="player-title">{blog.title}</div>
            <div className="player-artist">Eesha Gupta</div>
          </div>
        </div>

        <div className="player-center">
          <div className="player-progress-container">
            <div className="player-time player-time-left">{formatTime(currentTime)}</div>
            <div className="player-progress-bar">
              <div className="player-progress-fill" style={{ width: `${scrollProgress}%` }}></div>
            </div>
            <div className="player-time player-time-right">{formatTime(totalTime)}</div>
          </div>
        </div>

        <div className="player-right"></div>
      </div>
    </div>
  );
};

export default BlogDetail;
