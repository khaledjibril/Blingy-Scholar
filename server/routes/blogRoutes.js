const express = require('express');
const router = express.Router();
const {
  getBlogPosts,
  getBlogPostById,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
} = require('../controllers/blogController');
const { protect } = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');

// Public routes
router.get('/', getBlogPosts);
router.get('/:id', getBlogPostById);

// Admin-only routes
router.post('/', protect, admin, createBlogPost);
router.put('/:id', protect, admin, updateBlogPost);
router.delete('/:id', protect, admin, deleteBlogPost);

module.exports = router;
