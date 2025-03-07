import React, { useState ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { updatePost, createPost } from '../services/oprations/postService'; // Adjust the import path as needed

const BlogForm = ({ postId, initialData = {} }) => {
  const [title, setTitle] = useState(initialData.title || '');
  const [content, setContent] = useState(initialData.content || '');
  const [token,setToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(JSON.parse(localStorage.getItem("token")))

    }

  }, [title])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const postData = { title, content };

      if (postId) {
        // Update an existing post
        await updatePost(postId, postData,token);
      } else {
        // Create a new post
        await createPost(postData,token);
      }
      navigate('/');
    } catch (error) {
      console.error('Error saving post', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <div className="mb-4">
        <label className="block mb-1 font-medium">Title</label>
        <input
          type="text"
          className="w-full border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Content</label>
        <textarea
          className="w-full border p-2 rounded"
          rows="6"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>
      </div>
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
        {postId ? 'Update Post' : 'Create Post'}
      </button>
    </form>
  );
};

export default BlogForm;
