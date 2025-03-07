const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const auth = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

// GET /api/posts
router.get('/', blogController.getPosts);

// POST /api/posts
router.post('/', auth, blogController.createPost);

// PUT /api/posts/:id
router.put('/:id', auth, blogController.updatePost);

// DELETE /api/posts/:id
router.delete('/:id', auth, blogController.deletePost);

module.exports = router;
