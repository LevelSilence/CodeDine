const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }]
});
module.exports = mongoose.model('Category', categorySchema);
