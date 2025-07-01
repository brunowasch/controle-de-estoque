require('dotenv').config(); // Carrega variáveis do .env
const path = require('path');
const express = require('express');
const cors = require('cors');
const connectDB = require('./database');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
    res.render('cadastro');
});
connectDB().then(() => {
    app.listen(process.env.PORT, () => {
    console.log(`Servidor rodando na http://localhost:${process.env.PORT}`);
    });
});
