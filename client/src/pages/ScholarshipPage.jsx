
import React from 'react';
import PageTitle from "../components/PageTitle";
import ScholarshipFinder from '../components/ScholarshipFinder/ScholarshipFinder';

const ScholarshipPage = () => {
  return (
    <>
    <PageTitle title="Scholarships - Blingy Scholar" />
    <main>
      <h1>Find Scholarships</h1>
      <ScholarshipFinder />
    </main>
    </>
  );
};

export default ScholarshipPage;
