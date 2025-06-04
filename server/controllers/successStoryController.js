const pool = require('../config/db');

// Get all success stories
exports.getSuccessStories = async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM success_stories ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get single success story by ID
exports.getSuccessStoryById = async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM success_stories WHERE id = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: 'Success story not found' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


// Update a success story (Admin only)
// In successStoryController.js

exports.createSuccessStory = async (req, res) => {
  const { title, content, author_name } = req.body;
  let author_photo = null;

  if (req.file) {
    author_photo = `/uploads/authors/${req.file.filename}`;
  }

  try {
    const [result] = await pool.execute(
      'INSERT INTO success_stories (title, content, author_name, author_photo) VALUES (?, ?, ?, ?)',
      [title, content,  author_name, author_photo]
    );

    const [rows] = await pool.execute('SELECT * FROM success_stories WHERE id = ?', [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateSuccessStory = async (req, res) => {
  const { title, content, author_name } = req.body;
  let author_photo = null;

  if (req.file) {
    author_photo = `/uploads/authors/${req.file.filename}`;
  }

  try {
    // Fetch current photo to retain if no new upload
    const [currentRows] = await pool.execute('SELECT author_photo FROM success_stories WHERE id = ?', [req.params.id]);
    if (!currentRows.length) return res.status(404).json({ message: 'Success story not found' });

    const photoToUse = author_photo || currentRows[0].author_photo;

    const [result] = await pool.execute(
      `UPDATE success_stories
       SET title = ?, content = ?, author_name = ?, author_photo = ?
       WHERE id = ?`,
      [title, content, video_url, author_name, photoToUse, req.params.id]
    );

    const [rows] = await pool.execute('SELECT * FROM success_stories WHERE id = ?', [req.params.id]);
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a success story (Admin only)
exports.deleteSuccessStory = async (req, res) => {
  try {
    const [result] = await pool.execute('DELETE FROM success_stories WHERE id = ?', [req.params.id]);

    if (result.affectedRows === 0)
      return res.status(404).json({ message: 'Success story not found' });

    res.json({ message: 'Success story deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
