<<<<<<< HEAD
require('dotenv').config(); 
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./middlewares/authMiddleware');
=======
require('dotenv').config(); // Carrega variáveis do .env
const path = require('path');
>>>>>>> develop
const express = require('express');
const cors = require('cors');
const connectDB = require('./database');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.json());
app.use(cors());

<<<<<<< HEAD
app.use('/api/auth', authRoutes);

connectDB().then(() => {
    app.listen(process.env.PORT, () => {
    console.log(`Servidor rodando em http://localhost:${process.env.PORT}`);
=======

app.get('/', (req, res) => {
    res.render('cadastro');
});
app.get('/login', (req, res) => {
  res.render('login');
});

connectDB().then(() => {
    app.listen(process.env.PORT, () => {
    console.log(`Servidor rodando na http://localhost:${process.env.PORT}`);
>>>>>>> develop
    });
});
