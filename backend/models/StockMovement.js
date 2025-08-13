const mongoose = require('mongoose');

const StockMovementSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },     
  supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' },  
  type: { type: String, enum: ['IN', 'OUT', 'ADJUST'], default: 'IN' },
  quantity: { type: Number, required: true, min: 1 },
  unitPrice:{ type: Number, min: 0 }, 
  reason: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('StockMovement', StockMovementSchema);