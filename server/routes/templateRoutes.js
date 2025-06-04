const express = require('express');
const router = express.Router();
const templateController = require('../controllers/templateController');
const upload = require('../middleware/templateMiddleware');

// Public routes
router.get('/', templateController.getTemplates);
router.get('/:id', templateController.getTemplateById);
router.get('/:id/download', templateController.downloadTemplate);

// Admin routes (example - add auth middleware as needed)
router.post('/', upload.single('templateFile'), templateController.createTemplate);
router.put('/:id', upload.single('templateFile'), templateController.updateTemplate);
router.delete('/:id', templateController.deleteTemplate);

module.exports = router;
