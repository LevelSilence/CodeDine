const User = require('../models/user');
// Import other models if you have separate ones for progress/bookmarks
const saveProgress = async (req, res) => {
  try {
    const userId = req.user._id; // from protect middleware
    const { progressData } = req.body; // customize as you store progress

    // Find the user and update progress; you may adjust based on your schema
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Example: assuming user has a progress field storing progress data
    user.progress = progressData;

    await user.save();

    res.status(200).json({ message: "Progress saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


const getBookmarks = async (req, res) => {
  try {
    const userId = req.user._id;

    // Find the user and get bookmarks
    const user = await User.findById(userId).select('bookmarks');
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Assuming bookmarks is an array in user schema
    res.status(200).json({ bookmarks: user.bookmarks });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Add Bookmark
const addBookmark = async (req, res) => {
  const userId = req.user._id;
  const { questionId } = req.body;
  try {
    await User.findByIdAndUpdate(
      userId,
      { $addToSet: { bookmarks: questionId } }
    );
    res.json({ message: "Bookmarked successfully" });
  } catch (err) {
    res.status(500).json({ message: "Cannot bookmark", error: err.message });
  }
};

// Remove Bookmark
const removeBookmark = async (req, res) => {
  const userId = req.user._id;
  const { questionId } = req.body;
  try {
    await User.findByIdAndUpdate(
      userId,
      { $pull: { bookmarks: questionId } }
    );
    res.json({ message: "Bookmark removed" });
  } catch (err) {
    res.status(500).json({ message: "Cannot remove bookmark", error: err.message });
  }
};


module.exports = {
  saveProgress,
  getBookmarks,
  addBookmark,
  removeBookmark
};
