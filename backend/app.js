require('dotenv').config(); 
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./middlewares/authMiddleware');
const path = require('path');
const express = require('express');
const cors = require('cors');
const connectDB = require('./database');
const productRoutes = require('./routes/productRoutes');

const app = express();

// Serve os arquivos estáticos do build do React
app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')));

// Roteamento para servir o index.html para qualquer requisição não encontrada (para o React Router)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'build', 'index.html'));
});

// Configuração do express
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Para ler os dados do formulário
app.use(cors());

// Definição das rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Conexão com o banco de dados
connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Servidor rodando em http://localhost:${process.env.PORT}`);
    });
});
