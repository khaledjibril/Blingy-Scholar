import React, { useEffect, useState } from 'react';
import { getScholarships } from '../../api/scholarships';

const ScholarshipFinder = () => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getScholarships()
      .then(data => {
        setScholarships(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading scholarships...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section>
      <h2>Scholarship Finder</h2>
      <ul>
        {scholarships.map((scholarship, index) => {
          const { title, description, deadline, amount, eligibility, link } = scholarship;
          const formattedDeadline = new Date(deadline).toLocaleDateString();

          return (
            <li key={title + index}>
              <h3>{title}</h3>
              <p>{description}</p>
              <p>Deadline: {formattedDeadline}</p>
              <p>Amount: ${amount}</p>
              <p>Eligibility: {eligibility}</p>
              <p>
                Apply here: <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default ScholarshipFinder;
