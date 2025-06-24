const mongoose = require('mongoose');

const produtoSchema = new mongoose.Schema({
  nome: String,
  preco: Number,
  quantidade: Number,
  categoria: { type: mongoose.Schema.Types.ObjectId, ref: 'Categoria' }
});

module.exports = mongoose.model('Produto', produtoSchema);
