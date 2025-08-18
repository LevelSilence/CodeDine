const Category = require('../models/category');
const questions = require('../models/question');

exports.getContent = async (req, res) => {
  try {
    const { search = "", page = 1, limit = 10, sortBy } = req.query;

    // Build category search query (case-insensitive regex)
    const categoryQuery = {
      title: { $regex: search, $options: "i" },
    };  

    // Find matching categories, populate matching questions
    let query = Category.find(categoryQuery).populate({
      path: "questions",
      match: { title: { $regex: search, $options: "i" } },
    });

    // Apply sort if requested
    if (sortBy === "name") {
      query = query.sort({ title: 1 });
    }

    // Pagination
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(parseInt(limit));

    const categories = await query.exec();

    // Count total matching categories for pagination info
    const total = await Category.countDocuments(categoryQuery);

    // Filter out categories which have neither matching title nor matching questions
    const filteredCategories = categories.filter(
      (cat) => cat.questions.length > 0 || cat.title.match(new RegExp(search, "i"))
    );

    res.json({
      status: true,
      data: filteredCategories,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};
