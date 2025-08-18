const express = require('express');
const mongoose = require('mongoose');
const contentRoutes = require('./routes/content.js');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
require('dotenv').config();

const app = express();
app.use(express.json());

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
    // Start server only after DB connection
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

connectDB();

// Define your routes here (later)
app.use('/api/v1/content', contentRoutes);


app.use('/api/v1/auth', authRoutes);


app.use('/api/v1/user', userRoutes);
