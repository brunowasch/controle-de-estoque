const Produto = require('../models/Produto');

exports.listar = async (req, res) => {
  const produtos = await Produto.find().populate('categoria');
  res.json(produtos);
};

exports.criar = async (req, res) => {
  const produto = new Produto(req.body);
  await produto.save();
  res.json(produto);
};
