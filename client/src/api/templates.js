// src/api/templates.js
export async function getTemplates() {
  const response = await fetch('http://localhost:5000/api/templates');
  if (!response.ok) throw new Error('Failed to fetch templates');
  return await response.json();
}
