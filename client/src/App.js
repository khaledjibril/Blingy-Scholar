import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import HomePage from './pages/HomePage';
import SuccessStoryPage from './pages/SuccessStoryPage';
import SuccessStoryDetail from './components/SuccessStories/SuccessStoriesDetail'; // ✅ Detail import
import ScholarshipPage from './pages/ScholarshipPage';
import GuidesPage from './pages/GuidesPage';
import GuideDetail from './components/Guides/GuidesDetail';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/success-stories" element={<SuccessStoryPage />} />
        <Route path="/success-stories/:id" element={<SuccessStoryDetail />} /> {/* ✅ New route */}
        <Route path="/scholarships" element={<ScholarshipPage />} />
        <Route path="/guides" element={<GuidesPage />} />
        <Route path="/guides/:id" element={<GuideDetail />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
