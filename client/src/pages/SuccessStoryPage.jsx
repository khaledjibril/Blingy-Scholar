import React from 'react';
import PageTitle from "../components/PageTitle";
import SuccessStories from '../components/SuccessStories/SuccessStories';
import SuccessStoryDetail from '../components/SuccessStories/SuccessStoriesDetail';

const SuccessStoryPage = () => {
  return (
    <>
      <PageTitle title="Stories - Blingy Scholar" />
      <main>
        <SuccessStories />
        <SuccessStoryDetail />
      </main>
    </>
  );
};

export default SuccessStoryPage;
