import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getSuccessStoryById } from '../../api/successStories'; // Adjust path as needed
import styles from './SuccessStoriesDetail.module.css';

const SuccessStoryDetail = () => {
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSuccessStoryById(id)
      .then(data => {
        setStory(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading story...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!story) return <p>Story not found.</p>;

  return (
    <section className={styles.container}>
      <Link to="/success-stories" className={styles.backLink}>← Back to all stories</Link>
      <h1 className={styles.title}>{story.title}</h1>
      <p className={styles.author}>By {story.author_name || 'Unknown'}</p>
      {story.author_photo && (
        <div className={styles.avatarWrap}>
          <img
            src={`http://localhost:5000${story.author_photo}`}
            alt={story.author_name}
            className={styles.avatar}
          />
        </div>
      )}
      {story.video_url && (
        <div className={styles.videoWrap}>
          <video controls width="100%" className={styles.video}>
            <source src={story.video_url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
      <p className={styles.content}>{story.content}</p>
    </section>
  );
};

export default SuccessStoryDetail;
