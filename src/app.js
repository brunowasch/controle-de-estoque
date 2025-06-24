require('dotenv').config(); // Carrega variáveis do .env
const express = require('express');
const cors = require('cors');
const connectDB = require('./database');

const app = express();
app.use(express.json());
app.use(cors());

connectDB().then(() => {
    app.listen(process.env.PORT, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT}`);
    });
})
