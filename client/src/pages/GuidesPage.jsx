import React from 'react';
import GuidesList from '../components/Guides/GuidesList';
import PageTitle from "../components/PageTitle";

const GuidesPage = () => {
  return (
    <>
      <PageTitle title="Guides - Blingy Scholar" />
      <main style={{ maxWidth: '900px', margin: '2rem auto', padding: '0 1rem' }}>
        <GuidesList />
      </main>
    </>
  );
};

export default GuidesPage;