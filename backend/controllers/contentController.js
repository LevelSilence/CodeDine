const Category = require('../models/category');
const Question = require('../models/question');

exports.getContent = async (req, res) => {
  try {
    const { search, page = 1, limit = 10, sortBy } = req.query;
    let query = {};

    // Build query for category title or questions' title search (optional)
    if (search) {
      // For example: search categories by title or questions by title
      query = {
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { 'questions.title': { $regex: search, $options: 'i' } }
        ]
      };
    }

    // Pagination calculation
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Build mongoose query for categories and populate questions
    let categoryQuery = Category.find(query)
      .populate('questions')
      .skip(skip)
      .limit(parseInt(limit));

    // Sorting on category title or questions' title if needed
    if (sortBy === 'name' || sortBy === 'title') {
      categoryQuery = categoryQuery.sort({ title: 1 });
    }

    const categories = await categoryQuery.exec();
    const total = await Category.countDocuments(query);

    res.json({
      status: true,
      data: categories,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit))
    });
  } catch (err) {
    res.status(500).json({ status: false, error: err.message });
  }
};
