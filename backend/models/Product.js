const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true, min: 0 },
  stock: { type: Number, required: true, min: 0 },
  minStock: { type: Number, default: 0, min: 0 }, 
  category: { type: String },                      
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
