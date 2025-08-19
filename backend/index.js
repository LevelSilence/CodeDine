const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const contentRoutes = require('./routes/content.js');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173','https://codedine.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use('/api/v1/content', contentRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

connectDB();

