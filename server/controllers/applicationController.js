const pool = require('../config/db');

// User applies to a scholarship
exports.submitApplication = async (req, res) => {
  const { scholarship_id } = req.body;
  const user_id = req.user.id;

  try {
    // Check if user already applied
    const [exists] = await pool.execute(
      'SELECT * FROM applications WHERE user_id = ? AND scholarship_id = ?',
      [user_id, scholarship_id]
    );

    if (exists.length) {
      return res.status(400).json({ message: 'You have already applied to this scholarship' });
    }

    const [result] = await pool.execute(
      'INSERT INTO applications (user_id, scholarship_id) VALUES (?, ?)',
      [user_id, scholarship_id]
    );

    const [rows] = await pool.execute('SELECT * FROM applications WHERE id = ?', [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all applications for logged-in user
exports.getUserApplications = async (req, res) => {
  const user_id = req.user.id;

  try {
    const [rows] = await pool.execute(
      `SELECT a.*, s.title AS scholarship_title
       FROM applications a
       JOIN scholarships s ON a.scholarship_id = s.id
       WHERE a.user_id = ?
       ORDER BY a.submission_date DESC`,
      [user_id]
    );

    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get single application by ID (user or admin)
exports.getApplicationById = async (req, res) => {
  const user_id = req.user.id;
  const application_id = req.params.id;

  try {
    const [rows] = await pool.execute(
      `SELECT a.*, s.title AS scholarship_title, u.name AS applicant_name
       FROM applications a
       JOIN scholarships s ON a.scholarship_id = s.id
       JOIN users u ON a.user_id = u.id
       WHERE a.id = ?`,
      [application_id]
    );

    if (!rows.length) {
      return res.status(404).json({ message: 'Application not found' });
    }

    const application = rows[0];

    // Only allow user or admin to see the application
    if (req.user.role !== 'admin' && application.user_id !== user_id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(application);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Admin: Get all applications with optional status filter
exports.getAllApplications = async (req, res) => {
  try {
    let query = `
      SELECT a.*, s.title AS scholarship_title, u.name AS applicant_name
      FROM applications a
      JOIN scholarships s ON a.scholarship_id = s.id
      JOIN users u ON a.user_id = u.id
      WHERE 1=1
    `;
    const params = [];

    if (req.query.status) {
      query += ' AND a.status = ?';
      params.push(req.query.status);
    }

    query += ' ORDER BY a.submission_date DESC';

    const [rows] = await pool.execute(query, params);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Admin: Update application status
exports.updateApplicationStatus = async (req, res) => {
  const { status } = req.body;
  const application_id = req.params.id;

  if (!['pending', 'approved', 'rejected'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status value' });
  }

  try {
    const [result] = await pool.execute(
      'UPDATE applications SET status = ?, updated_at = NOW() WHERE id = ?',
      [status, application_id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Application not found' });
    }

    const [rows] = await pool.execute('SELECT * FROM applications WHERE id = ?', [application_id]);
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
