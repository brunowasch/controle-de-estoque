const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({
  tipo: { type: String, enum: ['compra', 'venda'] },
  data: { type: Date, default: Date.now },
  produto: { type: mongoose.Schema.Types.ObjectId, ref: 'Produto' },
  quantidade: Number
});

module.exports = mongoose.model('Pedido', pedidoSchema);
