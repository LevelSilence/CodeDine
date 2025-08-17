const mongoose = require('mongoose');
const axios = require('axios');
require('dotenv').config();

const Category = require('./models/category');
const Question = require('./models/question');

const DATA_URL = 'https://test-data-gules.vercel.app/data.json';

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Category.deleteMany({});
    await Question.deleteMany({});

    // Fetch remote data
    const response = await axios.get(DATA_URL);
    const result = response.data;

    for (const categoryData of result.data) {
      const questionIds = [];

      for (const q of categoryData.ques) {
        // Ensure title and at least one URL exists
        if (!q.title) continue;
        const url = q.yt_link || q.p1_link;
        if (!url) continue;

        // Save question
        const question = new Question({
          title: q.title,
          url: url
        });
        await question.save();
        questionIds.push(question._id);
      }

      // Save category with question references
      const category = new Category({
        title: categoryData.title,
        questions: questionIds
      });
      await category.save();
    }

    console.log('Database seeded successfully!');
    mongoose.connection.close();
  } catch (error) {
    console.error('Seeder failed:', error);
    mongoose.connection.close();
  }
}

seed();
