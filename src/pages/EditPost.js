// src/pages/EditPost.js
import React from 'react';
import { useParams } from 'react-router-dom';
import BlogForm from '../components/BlogForm';

const EditPost = () => {
  const { id } = useParams();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Edit Post</h1>
      <BlogForm postId={id} />
    </div>
  );
};

export default EditPost;
