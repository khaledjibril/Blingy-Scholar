const express = require('express');
const router = express.Router();
const {
  submitApplication,
  getUserApplications,
  getApplicationById,
  getAllApplications,
  updateApplicationStatus,
} = require('../controllers/applicationController');
const { protect } = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');

// User routes
router.post('/', protect, submitApplication);
router.get('/', protect, getUserApplications);
router.get('/:id', protect, getApplicationById);

// Admin routes
router.get('/all', protect, admin, getAllApplications);
router.put('/:id', protect, admin, updateApplicationStatus);

module.exports = router;
