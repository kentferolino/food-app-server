const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const CourseSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  created_by: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  created_date: {
    type: Date,
    default: Date.now
  },
});

module.exports = Course = mongoose.model('course', CourseSchema);
