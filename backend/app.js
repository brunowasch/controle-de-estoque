require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const { authenticateToken, isAdmin } = require('./middlewares/authMiddleware');
const path = require('path');
const express = require('express');
const cors = require('cors');
const connectDB = require('./database');
const productRoutes = require('./routes/productRoutes');
const clientRoutes = require('./routes/clientRoutes');
const supplierRoutes = require('./routes/supplierRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const app = express();

// Configurações
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Rotas API
app.use('/api/auth', authRoutes);
app.use('/api/products', authenticateToken, productRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/suppliers', authenticateToken, supplierRoutes);

// Swagger 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// React Front
app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'build', 'index.html'));
});


// Conexão BD
connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Servidor rodando em http://localhost:${process.env.PORT}`);
  });
});
