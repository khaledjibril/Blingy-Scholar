import React from 'react';
import PageTitle from "../components/PageTitle";
import Hero from '../components/Hero/Hero';
import QuickAccessToolbar from '../components/QuickAccessToolbar/QuickAccessToolbar';
import SuccessStories from '../components/SuccessStories/SuccessStories';

const HomePage = () => (
  <>
        <PageTitle title="Home - Blingy Scholar" />
    <Hero />
    <QuickAccessToolbar />
    <SuccessStories summaryOnly={true} />
    {/* Future sections: FeaturedContent, StartHereGuide */}
  </>
);

export default HomePage;
