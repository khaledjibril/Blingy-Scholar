const express = require('express');
const router = express.Router();

const { protect } = require('../middleware/authMiddleware'); // ✅ moved up
const admin = require('../middleware/adminMiddleware');

console.log('protect middleware:', protect); // ✅ now this will not crash

const {
  getScholarships,
  getScholarshipById,
  createScholarship,
  updateScholarship,
  deleteScholarship,
  saveScholarship,
  unsaveScholarship,
} = require('../controllers/scholarshipController');

// Public routes
router.get('/', getScholarships);
router.get('/:id', getScholarshipById);

// Protected routes
router.post('/', protect, admin, createScholarship);
router.put('/:id', protect, admin, updateScholarship);
router.delete('/:id', protect, admin, deleteScholarship);
router.post('/:id/save', protect, saveScholarship);
router.delete('/:id/save', protect, unsaveScholarship);

module.exports = router;
