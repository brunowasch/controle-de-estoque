const express = require('express');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();
require('./config/database');

// Middleware para JSON
app.use(bodyParser.json());

// Rotas
try {
  const produtoRoutes = require('./routes/produtoRoutes');
  const categoriaRoutes = require('./routes/categoriaRoutes');
  const pedidoRoutes = require('./routes/pedidoRoutes');
  const dashboardRoutes = require('./routes/dashboardRoutes');

  app.use('/produtos', produtoRoutes);
  app.use('/categorias', categoriaRoutes);
  app.use('/pedidos', pedidoRoutes);
  app.use('/dashboard', dashboardRoutes);
} catch (err) {
  console.error('Erro ao carregar rotas:', err.message);
}

// Porta do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando em http://localhost:${PORT}`));
