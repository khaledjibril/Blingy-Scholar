const pool = require('../config/db');

// List or search scholarships (with optional filters)
exports.getScholarships = async (req, res) => {
  try {
    let query = 'SELECT * FROM scholarships WHERE 1=1';
    const params = [];

    // Optional filters: title, deadline
    if (req.query.title) {
      query += ' AND title LIKE ?';
      params.push(`%${req.query.title}%`);
    }

    if (req.query.deadline) {
      query += ' AND deadline <= ?';
      params.push(req.query.deadline);
    }

    query += ' ORDER BY deadline ASC';

    const [rows] = await pool.execute(query, params);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get single scholarship by ID
exports.getScholarshipById = async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM scholarships WHERE id = ?', [req.params.id]);

    if (!rows.length) {
      return res.status(404).json({ message: 'Scholarship not found' });
    }

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Create new scholarship (Admin only)
exports.createScholarship = async (req, res) => {
  const { title, description, eligibility, deadline, link } = req.body;

  try {
    const [result] = await pool.execute(
      'INSERT INTO scholarships (title, description, eligibility, deadline, link, created_by) VALUES (?, ?, ?, ?, ?, ?)',
      [title, description, eligibility, deadline, link, req.user.id]
    );

    const [rows] = await pool.execute('SELECT * FROM scholarships WHERE id = ?', [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update scholarship (Admin only)
exports.updateScholarship = async (req, res) => {
  const { title, description, eligibility, deadline, link } = req.body;

  try {
    const [result] = await pool.execute(
      'UPDATE scholarships SET title = ?, description = ?, eligibility = ?, deadline = ?, link = ? WHERE id = ?',
      [title, description, eligibility, deadline, link, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Scholarship not found' });
    }

    const [rows] = await pool.execute('SELECT * FROM scholarships WHERE id = ?', [req.params.id]);
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete scholarship (Admin only)
exports.deleteScholarship = async (req, res) => {
  try {
    const [result] = await pool.execute('DELETE FROM scholarships WHERE id = ?', [req.params.id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Scholarship not found' });
    }

    res.json({ message: 'Scholarship deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Save scholarship for user
exports.saveScholarship = async (req, res) => {
  const userId = req.user.id;
  const scholarshipId = req.params.id;

  try {
    // Check if already saved
    const [exists] = await pool.execute(
      'SELECT * FROM saved_scholarships WHERE user_id = ? AND scholarship_id = ?',
      [userId, scholarshipId]
    );

    if (exists.length) {
      return res.status(400).json({ message: 'Scholarship already saved' });
    }

    await pool.execute(
      'INSERT INTO saved_scholarships (user_id, scholarship_id) VALUES (?, ?)',
      [userId, scholarshipId]
    );

    res.status(201).json({ message: 'Scholarship saved' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Remove saved scholarship
exports.unsaveScholarship = async (req, res) => {
  const userId = req.user.id;
  const scholarshipId = req.params.id;

  try {
    const [result] = await pool.execute(
      'DELETE FROM saved_scholarships WHERE user_id = ? AND scholarship_id = ?',
      [userId, scholarshipId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Saved scholarship not found' });
    }

    res.json({ message: 'Scholarship removed from saved list' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
