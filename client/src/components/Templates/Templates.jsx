import React from 'react';
import { Link } from 'react-router-dom';

const TemplatesToolbar = () => {
  return (
    <nav className="templates-toolbar">
      <Link to="/templates/essays">✍️ Essay Templates</Link>
      <Link to="/templates/resumes">📄 CV/Resume Builder</Link>
      <Link to="/scholarships">🎓 Scholarship Finder</Link>
      <Link to="/success-stories">🎤 Success Stories</Link>
    </nav>
  );
};

export default TemplatesToolbar;
