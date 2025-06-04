import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { getSuccessStories } from '../../api/successStories';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './SuccessStories.module.css';

const SuccessStories = ({ summaryOnly = false }) => {
  const [stories, setStories] = useState([]);
  const [error, setError] = useState(null);
  const sliderRef = useRef(null);

  useEffect(() => {
    getSuccessStories()
      .then(data => setStories(data))
      .catch(err => setError(err.message));
  }, []);

  const getScrollAmount = () => {
    if (window.innerWidth < 600) return 220;
    if (window.innerWidth < 900) return 300;
    return 360;
  };

  const scroll = (direction) => {
    const { current } = sliderRef;
    if (current) {
      const scrollAmount = direction === 'left' ? -getScrollAmount() : getScrollAmount();
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (error) return <p className={styles.errorMessage}>Error: {error}</p>;
  if (!stories.length) return (
    <div className={styles.loaderContainer}>
      <div className={styles.loader}></div>
      <p className={styles.loadingText}>Loading success stories...</p>
    </div>
  );

  return (
    <section className={summaryOnly ? styles.section : styles.successWrapper}>
      {summaryOnly ? (
        <div className={styles.sliderContainer}>
          <button
            onClick={() => scroll('left')}
            aria-label="Scroll left"
            className={styles.scrollBtnLeft}
          >
            <ChevronLeft />
          </button>

          <ul ref={sliderRef} className={`${styles.storyList} ${styles.swiperList}`}>
            {stories.map(({ id, title, author_name, author_photo }) => (
              <li key={id} className={styles.cardWrapperSummary}>
                <Link to={`/success-stories/${id}`} className={styles.cardLink}>
                  <div className={styles.cardContent}>
                    <div className={styles.avatarWrap}>
                      <img
                        src={author_photo ? `http://localhost:5000${author_photo}` : '/default-avatar.png'}
                        alt={author_name || 'Author'}
                        className={styles.avatar}
                      />
                    </div>
                    <h3 className={styles.title}>{title}</h3>
                    <p className={styles.author}>By {author_name || 'Unknown'}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          <button
            onClick={() => scroll('right')}
            aria-label="Scroll right"
            className={styles.scrollBtnRight}
          >
            <ChevronRight />
          </button>
        </div>
      ) : (
        <>

        <header className="guides-header enhanced">
            <h1>Success Stories</h1>
            <p>Real-life journeys from our scholarship recipients.</p>
      </header>
          <ul className={styles.successGrid}>
            {stories.map(({ id, title, author_name, author_photo }) => (
              <li key={id} className={styles.successCard}>
                <Link to={`/success-stories/${id}`} className={styles.successLink}>
                  {author_photo && (
                    <img
                      src={`http://localhost:5000${author_photo}`}
                      alt={author_name || 'Author'}
                      className={styles.successImage}
                      loading="lazy"
                    />
                  )}
                  <h2>{title}</h2>
                  {author_name && <p className={styles.authorName}>By {author_name}</p>}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
};

export default SuccessStories;
