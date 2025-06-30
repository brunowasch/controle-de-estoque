require('dotenv').config(); 
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./middlewares/authMiddleware');
const express = require('express');
const cors = require('cors');
const connectDB = require('./database');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);

connectDB().then(() => {
    app.listen(process.env.PORT, () => {
    console.log(`Servidor rodando em http://localhost:${process.env.PORT}`);
    });
})
