const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  title: {
    type: String,
    requited: true,
    unique: true
  },
  keywords: Array,
  isPublished: Boolean,
});

module.exports = mongoose.model('Book', BookSchema);
