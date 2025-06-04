const pool = require('../config/db');

// Get all blog posts (optionally search by title)
exports.getBlogPosts = async (req, res) => {
  try {
    let query = 'SELECT bp.*, u.name AS author FROM blog_posts bp LEFT JOIN users u ON bp.author_id = u.id WHERE 1=1';
    const params = [];

    if (req.query.title) {
      query += ' AND bp.title LIKE ?';
      params.push(`%${req.query.title}%`);
    }

    query += ' ORDER BY bp.created_at DESC';

    const [rows] = await pool.execute(query, params);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get single blog post by ID
exports.getBlogPostById = async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT bp.*, u.name AS author FROM blog_posts bp LEFT JOIN users u ON bp.author_id = u.id WHERE bp.id = ?',
      [req.params.id]
    );

    if (!rows.length) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new blog post (Admin only)
exports.createBlogPost = async (req, res) => {
  const { title, content } = req.body;

  try {
    const [result] = await pool.execute(
      'INSERT INTO blog_posts (title, content, author_id) VALUES (?, ?, ?)',
      [title, content, req.user.id]
    );

    const [rows] = await pool.execute('SELECT * FROM blog_posts WHERE id = ?', [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update blog post (Admin only)
exports.updateBlogPost = async (req, res) => {
  const { title, content } = req.body;

  try {
    const [result] = await pool.execute(
      'UPDATE blog_posts SET title = ?, content = ? WHERE id = ?',
      [title, content, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    const [rows] = await pool.execute('SELECT * FROM blog_posts WHERE id = ?', [req.params.id]);
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete blog post (Admin only)
exports.deleteBlogPost = async (req, res) => {
  try {
    const [result] = await pool.execute('DELETE FROM blog_posts WHERE id = ?', [req.params.id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    res.json({ message: 'Blog post deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
