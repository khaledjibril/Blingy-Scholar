import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getGuides } from '../../api/guides';
import TemplatesList from '../Templates/TemplatesList';
import './GuidesList.css';

const PAGE_SIZE = 10;

const GuidesList = () => {
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getGuides()
      .then(data => {
        setGuides(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message || 'Failed to load guides');
        setLoading(false);
      });
  }, []);

  const totalPages = Math.ceil(guides.length / PAGE_SIZE);
  const pagedGuides = guides.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handlePrev = () => setPage(p => Math.max(1, p - 1));
  const handleNext = () => setPage(p => Math.min(totalPages, p + 1));
  const handlePageClick = (pg) => setPage(pg);

  if (loading) {
    return (
      <div className="guides-loader-container">
        <div className="loader"></div>
        <p className="loading-text">Loading guides...</p>
      </div>
    );
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <main className="guides-wrapper">
      <header className="guides-header enhanced">
        <h1>Unlock Scholarships with Confidence</h1>
        <p>
          Dive into expertly crafted guides that simplify your scholarship journey.<br />
          From application tips to insider insights — we've got you covered.
        </p>
      </header>

      <ul className="guides-grid">
        {pagedGuides.map(({ id, title, excerpt, date, coverImage }) => (
          <li key={id} className="guide-card">
            <Link to={`/guides/${id}`} className="guide-link">
              {coverImage && (
                <img src={coverImage} alt={title} className="guide-image" />
              )}
              <h2>{title}</h2>
              {date && <span className="guide-date">{new Date(date).toLocaleDateString()}</span>}
              {excerpt && <p className="guide-excerpt">{excerpt}</p>}
            </Link>
          </li>
        ))}
      </ul>

      <nav className="pagination">
        <button onClick={handlePrev} disabled={page === 1}>&laquo; Prev</button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => handlePageClick(i + 1)}
            className={page === i + 1 ? 'active' : ''}
          >
            {i + 1}
          </button>
        ))}
        <button onClick={handleNext} disabled={page === totalPages}>Next &raquo;</button>
      </nav>

      {/* 📄 Scholarship Templates Section */}
      <section className="templates-section">
        <h2 className="section-heading">Helpful Scholarship Templates</h2>
        <TemplatesList />
      </section>
    </main>
  );
};

export default GuidesList;
