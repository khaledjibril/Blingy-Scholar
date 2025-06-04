import React from 'react';
import { Link } from 'react-router-dom';
import styles from './QuickAccessToolbar.module.css';

const QuickAccessToolbar = () => (
  <nav className={styles.toolbar} aria-label="Quick Access">
    <Link to="/guides" className={styles.link} tabIndex={0} aria-label="Essay Templates">
      <span role="img" aria-label="Essay Templates">✍️</span> Essay Templates
    </Link>
    <Link to="/guides" className={styles.link} tabIndex={0} aria-label="CV/Resume Builder">
      <span role="img" aria-label="CV/Resume Builder">📄</span> CV/Resume Builder
    </Link>
    <Link to="/scholarships" className={styles.link} tabIndex={0} aria-label="Scholarship Finder">
      <span role="img" aria-label="Scholarship Finder">🎓</span> Scholarship Finder
    </Link>
    <Link to="/success-stories" className={styles.link} tabIndex={0} aria-label="Success Stories">
      <span role="img" aria-label="Success Stories">🎤</span> Success Stories
    </Link>
  </nav>
);

export default QuickAccessToolbar;
