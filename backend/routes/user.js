const express = require('express');
const router = express.Router();
const protect = require('../middlewares/auth');
const { saveProgress, getBookmarks,addBookmark,removeBookmark } = require('../controllers/userController');

router.post('/progress', protect, saveProgress);
router.get('/bookmarks', protect, getBookmarks);
router.post('/bookmarks/add', protect, addBookmark);
router.post('/bookmarks/remove', protect, removeBookmark);

module.exports = router;
