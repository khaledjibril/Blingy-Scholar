import React from 'react';
import styles from './Footer.module.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <h2>
            <span className={styles.logoIcon} role="img" aria-label="logo"></span>
            <span className={styles.logoDot}>🎓BlingyScholar</span>
            <span className={styles.brandDot}>.</span>
          </h2>
          <p>
            Empowering your scholarship journey, one step at a time.
          </p>
        </div>

        <div className={styles.links}>
          <h4>Explore</h4>
          <ul>
            <li><Link to="/guides">Guides</Link></li>
            <li><Link to="/scholarships">Scholarships</Link></li>
            <li><Link to="/success-stories">Success Stories</Link></li>
          </ul>
        </div>

        <div className={styles.contact}>
          <h4>Contact</h4>
          <ul>
            <li><a href="mailto:support@blingyscholar.com">support@blingyscholar.com</a></li>
            <li><a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">Twitter</a></li>
            <li><a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        <p className={styles.bottomEnd}>
          &copy; {new Date().getFullYear()} BlingyScholar. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;