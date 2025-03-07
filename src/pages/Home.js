import React from 'react';
import BlogList from '../components/BlogList';

const Home = () => {
    
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Latest Posts</h1>
      <BlogList />
    </div>
  );
};

export default Home;
