import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getGuideById } from '../../api/guides';

const GuideDetail = () => {
  const { id } = useParams();
  const [guide, setGuide] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getGuideById(id)
      .then(data => {
        setGuide(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message || 'Failed to load the guide');
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return (
      <div style={{ textAlign: 'center', margin: '3rem 0', color: '#2a7ae2', fontSize: '1.15rem' }}>
        <div style={{
          margin: '0 auto 1rem',
          width: 36,
          height: 36,
          border: '4px solid #e4e4e4',
          borderTop: '4px solid #2a7ae2',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
        Loading article...
        <style>
          {`
          @keyframes spin {
            0% { transform: rotate(0deg);}
            100% { transform: rotate(360deg);}
          }
          `}
        </style>
      </div>
    );

  if (error)
    return <p style={{ textAlign: 'center', color: '#e63946', margin: '3rem 0' }}>Error: {error}</p>;

  if (!guide)
    return <p style={{ textAlign: 'center', color: '#e63946', margin: '3rem 0' }}>Guide not found</p>;

  return (
    <main style={{
      maxWidth: 740,
      margin: '2.5rem auto',
      padding: '0 1.3rem 2.5rem',
      fontFamily: 'Georgia, serif',
      background: '#fff',
      borderRadius: 16,
      boxShadow: '0 4px 32px rgba(42,122,226,0.09), 0 1px 6px rgba(0,0,0,0.03)'
    }}>
      <Link
        to="/guides"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          marginBottom: '2rem',
          color: '#2a7ae2',
          padding: '0.55em 1.2em',
          fontSize: '1.04rem',
          fontWeight: 600,
          border: 'none',
          borderRadius: 8,
          background: 'linear-gradient(90deg, #e9f0fc 55%, #fafdff 100%)',
          boxShadow: '0 1px 10px rgba(42,122,226,0.06)',
          textDecoration: 'none',
          transition: 'background 0.15s, color 0.15s, box-shadow 0.15s'
        }}
          onMouseOver={e => {
              e.currentTarget.style.background = 'linear-gradient(90deg, #2a7ae2 60%, #4890f8 100%)';
              e.currentTarget.style.color = '#fff';
            }}
        onMouseOut={e => {
                e.currentTarget.style.background = 'transparent'; // or original background
                e.currentTarget.style.color = ''; // or original color
              }}
      >
        <span style={{
          display: 'inline-block',
          marginRight: 8,
          fontSize: '1.2em',
          color: 'inherit'
        }}>
          &larr;
        </span>
        Back to Guides
      </Link>

      {/* Card with guide meta (if you want to show more info, adjust accordingly) */}
      <section style={{
        background: 'linear-gradient(95deg, #e3f0fa 60%, #fafdff 100%)',
        borderRadius: 12,
        boxShadow: '0 2px 14px rgba(42,122,226,0.08)',
        padding: '1.5rem 1.5rem 1rem 1.5rem',
        marginBottom: '2.3rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8
      }}>
        {guide.coverImage && (
          <img
            src={guide.coverImage}
            alt={guide.title}
            style={{
              width: 96,
              height: 96,
              borderRadius: '50%',
              objectFit: 'cover',
              marginBottom: '1rem',
              boxShadow: '0 2px 8px rgba(42,122,226,0.11)'
            }}
          />
        )}
        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontSize: '1.13rem',
            fontWeight: 700,
            color: '#2a7ae2',
            marginBottom: 2,
            letterSpacing: '-0.5px'
          }}>
            {guide.title}
          </div>
          {guide.date && (
            <div style={{ color: '#888', fontSize: '0.96rem' }}>
              {new Date(guide.date).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          )}
          {guide.author && (
            <div style={{ color: '#666', fontSize: '0.95rem', marginTop: 2 }}>
              <b>By Blingy Scholar </b>
            </div>
          )}
          {guide.tags && Array.isArray(guide.tags) && guide.tags.length > 0 && (
            <div style={{
              marginTop: 10,
              display: 'flex',
              justifyContent: 'center',
              gap: 8,
              flexWrap: 'wrap'
            }}>
              {guide.tags.map(tag => (
                <span key={tag} style={{
                  padding: '0.22em 0.8em',
                  borderRadius: 6,
                  background: '#dbeafe',
                  color: '#2563eb',
                  fontWeight: 600,
                  fontSize: '0.92em'
                }}>#{tag}</span>
              ))}
            </div>
          )}
        </div>
      </section>
      <article>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', textAlign: 'center', color: '#1d3557', lineHeight: 1.16 }}>
          {/* {guide.title} */}
        </h1>
        <p style={{ fontSize: '1.2rem', lineHeight: 1.6, whiteSpace: 'pre-wrap', color: '#232f3e' }}>
          {guide.content}
        </p>
      </article>
    </main>
  );
};

export default GuideDetail;