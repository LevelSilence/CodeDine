const mongoose = require('mongoose');
const questionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true }
});
module.exports = mongoose.model('Question', questionSchema);
