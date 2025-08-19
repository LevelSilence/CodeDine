const Category = require('../models/category');
const questions = require('../models/question');

exports.getContent = async (req, res) => {
  try {
    const { search = "", page = 1, limit = 10, sortBy } = req.query;

    const categoryQuery = {
      title: { $regex: search, $options: "i" },
    };  

    let query = Category.find(categoryQuery).populate({
      path: "questions",
      match: { title: { $regex: search, $options: "i" } },
    });

    if (sortBy === "name") {
      query = query.sort({ title: 1 });
    }

    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(parseInt(limit));

    const categories = await query.exec();

    const total = await Category.countDocuments(categoryQuery);

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
