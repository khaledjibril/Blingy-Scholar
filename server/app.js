const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const authRoutes = require('./routes/authRoutes');
const scholarshipRoutes = require('./routes/scholarshipRoutes');
const blogRoutes = require('./routes/blogRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const templateRoutes = require('./routes/templateRoutes');
const successStoryRoutes = require('./routes/successStoryRoutes');



const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

app.use('/api/scholarships', scholarshipRoutes);

app.use('/api/blogs', blogRoutes);

app.use('/api/applications', applicationRoutes);

app.use('/api/templates', templateRoutes);

app.use('/api/success-stories', successStoryRoutes);



app.use('/uploads/authors', express.static(path.join(__dirname, 'uploads/authors')));




const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
console.log(`Server running on: http://localhost:${PORT}`);
});
