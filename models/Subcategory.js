const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const SubcategorySchema = new Schema({
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
  course: {
    type: Schema.Types.ObjectId,
    ref: 'course'
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

module.exports = Subcategory = mongoose.model('subcategory', SubcategorySchema);
