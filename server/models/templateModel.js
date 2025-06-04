const pool = require('../config/db');

exports.getAllTemplates = async (category) => {
  let query = 'SELECT * FROM templates WHERE 1=1';
  const params = [];
  if (category) {
    query += ' AND category = ?';
    params.push(category);
  }
  query += ' ORDER BY created_at DESC';
  const [rows] = await pool.execute(query, params);
  return rows;
};

exports.getTemplateById = async (id) => {
  const [rows] = await pool.execute('SELECT * FROM templates WHERE id = ?', [id]);
  return rows[0];
};

exports.createTemplate = async (template) => {
  const { title, category, file_name, original_name, file_type, file_size } = template;
  const [result] = await pool.execute(
    `INSERT INTO templates 
    (title, category, file_name, original_name, file_type, file_size, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())`,
    [title, category, file_name, original_name, file_type, file_size]
  );
  return this.getTemplateById(result.insertId);
};

exports.updateTemplate = async (id, template) => {
  const { title, category, file_name, original_name, file_type, file_size } = template;
  const [result] = await pool.execute(
    `UPDATE templates 
    SET title = ?, category = ?, file_name = ?, original_name = ?, file_type = ?, file_size = ?, updated_at = NOW()
    WHERE id = ?`,
    [title, category, file_name, original_name, file_type, file_size, id]
  );
  if (result.affectedRows === 0) return null;
  return this.getTemplateById(id);
};

exports.deleteTemplate = async (id) => {
  const [result] = await pool.execute('DELETE FROM templates WHERE id = ?', [id]);
  return result.affectedRows > 0;
};
