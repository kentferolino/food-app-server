const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const FoodItemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: false
  },
  subcategory: {
    type: Schema.Types.ObjectId,
    ref: 'subcategory'
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

module.exports = FoodItem = mongoose.model('fooditem', FoodItemSchema);
