const BlogPost = require('../models/BlogPost');
const User = require('../models/User')

// GET /api/posts?search=&page=&sort=
exports.getPosts = async (req, res) => {
  try {
    let { page = 1, search = '', sort = 'createdAt:desc' } = req.query;
    page = parseInt(page);
    const pageSize = 10;
    const query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
      ];
    }

    // Process sort parameter (e.g., "createdAt:desc")
    const [field, order] = sort.split(':');
    const sortOption = {};
    sortOption[field] = order === 'desc' ? -1 : 1;

    const posts = await BlogPost.find(query)
      .sort(sortOption)
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    res.json({ posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// POST /api/posts
exports.createPost = async (req, res) => {
    try {
      const { title, content } = req.body;
      // Use req.userId from middleware
      const user = await User.findById(req.userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      const author = user.username;
      let imageUrl = null;
  
      if (req.file) {
        imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
      }
  
      const newPost = new BlogPost({ title, content, imageUrl, author });
      await newPost.save();
  
      res.status(201).json(newPost);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

// PUT /api/posts/:id
exports.updatePost = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    // Only allow the post's author to update the post.
    const user = await User.findById(req.userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      const author = user.username;
    if (post.author !== author) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const { title, content } = req.body;
    if (title) post.title = title;
    if (content) post.content = content;
    if (req.file) {
      post.imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    }
    post.updatedAt = Date.now();
    await post.save();

    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// DELETE /api/posts/:id
exports.deletePost = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ success:false, message: 'Post not found' });
    }
    // Only allow the post's author to delete the post.
    const user = await User.findById(req.userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      const author = user.username;
    if (post.author !== author) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await post.deleteOne();
    res.json({ message: 'Post deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
