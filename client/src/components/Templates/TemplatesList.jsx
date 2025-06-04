// src/components/Templates/TemplatesList.jsx
import React, { useEffect, useState } from 'react';
import { getTemplates } from '../../api/templates';
import './TemplatesList.css';

const TemplatesList = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getTemplates()
      .then(data => {
        setTemplates(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message || 'Failed to load templates');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="templates-loading">Loading templates...</p>;
  }

  if (error) {
    return <p className="templates-error">Error: {error}</p>;
  }

  return (
    <section className="templates-section">
      <h2 className="templates-title">Download Scholarship Templates</h2>
      <ul className="templates-grid">
        {templates.map(({ id, title, category, file_path }) => (
          <li key={id} className="template-card">
            <div className="template-info">
              <h3>{title}</h3>
              <span className="template-category">{category.toUpperCase()}</span>
            </div>
            <a
              href={`http://localhost:5000/api/templates/${id}/download`}
              target="_blank"
              rel="noopener noreferrer"
              className="template-download-btn"
            >
              Download
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TemplatesList;
