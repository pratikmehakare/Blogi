// src/pages/CreatePost.js
import React from 'react';
import BlogForm from '../components/BlogForm';

const CreatePost = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Create New Post</h1>
      <BlogForm />
    </div>
  );
};

export default CreatePost;
