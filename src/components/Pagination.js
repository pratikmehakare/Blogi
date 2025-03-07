// src/components/Pagination.js
import React from 'react';

const Pagination = ({ currentPage, onPageChange, pageSize, totalPosts }) => {
  const totalPages = Math.ceil(totalPosts / pageSize);

  return (
    <div className="flex justify-center items-center mt-4 space-x-4">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
      >
        Previous
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
