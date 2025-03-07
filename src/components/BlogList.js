import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllPost, deletePost } from '../services/oprations/postService'; // Adjust path if needed
import Pagination from './Pagination';

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const [token,setToken] = useState(null);
  const pageSize = 10;

    useEffect(() => {
      if (localStorage.getItem("token")) {
        setToken(JSON.parse(localStorage.getItem("token")))
  
      }
    }, [token])

  const fetchPosts = async () => {
    try {

      const data = await getAllPost(); // Gets posts from the API
      setPosts(data);
      // Update totalPosts if your backend provides it:
      // setTotalPosts(data.total);
    } catch (error) {
      console.error('Error fetching posts', error);
    }
  };

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line
  }, [page, search]);

  const handleDelete = async (id) => {
    try {
      await deletePost(id,token);
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post', error);
    }
  };

  // Check if user is logged in by verifying if token exists
  

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search posts..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="border p-2 rounded w-full"
        />
      </div>
      {posts.map((post) => (
        <div key={post._id} className="border rounded p-4 mb-4 bg-white shadow">
          <h2 className="text-2xl font-bold">{post.title}</h2>
          <p className="text-gray-600">By {post.author}</p>
          <p className="text-sm text-gray-500">
            Created: {new Date(post.createdAt).toLocaleString()} | Updated: {new Date(post.updatedAt).toLocaleString()}
          </p>
          {post.imageUrl && (
            <img
              src={post.imageUrl}
              alt={post.title}
              className="mt-4 w-full max-h-80 object-cover"
            />
          )}
          {token && (
            <div className="mt-4 flex space-x-2">
              <Link
                to={`/edit/${post._id}`}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(post._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ))}

      <Pagination
        currentPage={page}
        onPageChange={setPage}
        pageSize={pageSize}
        totalPosts={totalPosts || 100} // Replace with totalPosts if backend sends it
      />
    </div>
  );
};

export default BlogList;
