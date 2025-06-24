const mongoose = require('mongoose');

const categoriaSchema = new mongoose.Schema({
  nome: String
});

module.exports = mongoose.model('Categoria', categoriaSchema);
