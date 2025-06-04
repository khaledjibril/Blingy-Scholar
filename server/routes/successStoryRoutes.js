const express = require('express');
const upload = require('../middleware/uploadMiddleware');
const router = express.Router();
const {
  getSuccessStories,
  getSuccessStoryById,
  createSuccessStory,
  updateSuccessStory,
  deleteSuccessStory,
} = require('../controllers/successStoryController');
const { protect } = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');

// Public routes
router.get('/', getSuccessStories);
router.get('/:id', getSuccessStoryById);

// Admin routes with file upload
router.post('/', protect, admin, upload.single('author_photo'), createSuccessStory);
router.put('/:id', protect, admin, upload.single('author_photo'), updateSuccessStory);
router.delete('/:id', protect, admin, deleteSuccessStory);

module.exports = router;

