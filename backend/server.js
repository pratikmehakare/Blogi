require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (for uploaded images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
const blogRoutes = require('./routes/blogRoute');
app.use('/api/v1/posts', blogRoutes);

const authRoute = require('./routes/authRoute')
app.use('/api/v1/auth',authRoute)


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
