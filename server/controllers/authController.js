const pool = require('../config/db');
const bcrypt = require('bcrypt');
const generateToken = require('../utils/generateToken');

exports.registerUser = async (req, res) => {
  console.log('Register request body:', req.body);
  const { name, email, password, role } = req.body;

  try {
    // Check if user exists
    const [existing] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
    if (existing.length) {
      return res.status(400).json({ message: 'User already exists' });
    }
        // Set role safely to avoid users registering as admin
    const roleToUse = role === 'admin' ? 'user' : role || 'user';


    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert user
    const [result] = await pool.execute(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, role]
    );

    const user = {
      id: result.insertId,
      name,
      email,
      role: roleToUse,
    };

    res.status(201).json({
      user,
      token: generateToken(user),
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.loginUser = async (req, res) => {
  console.log('Login request body:', req.body);
  const { email, password } = req.body;

  try {
    const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
    if (!rows.length) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.json({
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
      token: generateToken(user),
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getUserProfile = async (req, res) => {
  res.json(req.user);
};
