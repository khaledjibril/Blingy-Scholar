import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import { FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const isLoggedIn = !!localStorage.getItem('blingyScholarToken');

  const handleProfileClick = () => {
    if (isLoggedIn) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.logo}>
          <NavLink to="/" onClick={() => setMenuOpen(false)}>
            <span className={styles.logoIcon} role="img" aria-label="logo">🎓</span>
            <span className={styles.logocolor}>Blingy</span><span className={styles.logoDot}>Scholar</span>
          </NavLink>
        </h1>

        <div className={styles.burger} onClick={toggleMenu}>
          {menuOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
        </div>

        <nav className={`${styles.nav} ${menuOpen ? styles.showMenu : ''}`}>
          <NavLink to="/guides" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? styles.active : undefined}>
            Guides
          </NavLink>
          <NavLink to="/scholarships" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? styles.active : undefined}>
            Scholarships
          </NavLink>
          <NavLink to="/success-stories" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? styles.active : undefined}>
            Success Stories
          </NavLink>

          <div 
            onClick={handleProfileClick}
            className={styles.profileIcon}
            title={isLoggedIn ? "Go to dashboard" : "Login / Register"}
            tabIndex={0}
            role="button"
            aria-label={isLoggedIn ? "Go to dashboard" : "Login or Sign up"}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') handleProfileClick(); }}
          >
            <FaUserCircle size={41} />
            <span className={styles.profileDot} aria-hidden={true} style={{background: isLoggedIn ? "#6C63FF" : "#FFC857"}} />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
