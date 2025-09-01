require('dotenv').config();

const path = require('path');
const express = require('express');
const cors = require('cors');

const connectDB = require('./database');
const authRoutes = require('./routes/authRoutes');
const { authenticateToken } = require('./middlewares/authMiddleware');
const stockRoutes = require('./routes/stockRoutes');
const productRoutes = require('./routes/productRoutes');
const clientRoutes = require('./routes/clientRoutes');
const supplierRoutes = require('./routes/supplierRoutes');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const app = express();

app.set('trust proxy', 1);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const ORIGIN = process.env.CORS_ORIGIN;
const corsOptions =
  ORIGIN
    ? { origin: ORIGIN, credentials: true } 
    : { origin: true }; 

app.use(cors(corsOptions));

app.get('/health', (_req, res) => res.send('ok'));

app.use('/api/auth', authRoutes);
app.use('/api/products', authenticateToken, productRoutes);
app.use('/api/stock', authenticateToken, stockRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/suppliers', authenticateToken, supplierRoutes);

// Swagger 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// rontend 
const buildPath = path.join(__dirname, '..', 'frontend', 'build');
app.use(express.static(buildPath));

app.get('*', (_req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

// Inicialização 
const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
});
