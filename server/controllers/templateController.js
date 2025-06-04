const path = require('path');
const templateModel = require('../models/templateModel');

exports.getTemplates = async (req, res) => {
  try {
    const templates = await templateModel.getAllTemplates(req.query.category);
    res.json(templates);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getTemplateById = async (req, res) => {
  try {
    const template = await templateModel.getTemplateById(req.params.id);
    if (!template) return res.status(404).json({ message: 'Template not found' });
    res.json(template);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createTemplate = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'Template file is required' });

    const { title, category } = req.body;
    const { filename, originalname, mimetype, size } = req.file;

    const newTemplate = await templateModel.createTemplate({
      title,
      category,
      file_name: filename,
      original_name: originalname,
      file_type: mimetype,
      file_size: size,
    });

    res.status(201).json(newTemplate);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateTemplate = async (req, res) => {
  try {
    const { title, category } = req.body;
    let fileData = {};

    if (req.file) {
      const { filename, originalname, mimetype, size } = req.file;
      fileData = {
        file_name: filename,
        original_name: originalname,
        file_type: mimetype,
        file_size: size,
      };
    }

    const updatedTemplate = await templateModel.updateTemplate(req.params.id, {
      title,
      category,
      ...fileData,
    });

    if (!updatedTemplate) return res.status(404).json({ message: 'Template not found' });

    res.json(updatedTemplate);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteTemplate = async (req, res) => {
  try {
    const deleted = await templateModel.deleteTemplate(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Template not found' });
    res.json({ message: 'Template deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.downloadTemplate = async (req, res) => {
  try {
    const template = await templateModel.getTemplateById(req.params.id);
    if (!template) return res.status(404).json({ message: 'Template not found' });

    const filePath = path.join(__dirname, '../uploads/templates', template.file_name);
    res.download(filePath, template.original_name);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
