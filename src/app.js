require('dotenv').config(); 
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./middlewares/authMiddleware');
const path = require('path');
const express = require('express');
const cors = require('cors');
const connectDB = require('./database');
const productRoutes = require('./routes/productRoutes');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // para ler os dados interpretar req.body
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Servidor rodando em http://localhost:${process.env.PORT}`);
    });
});

app.get("/", (req, res) => {
  res.render("cadastro", { error: null }); // evitar erro de variável não definida
});

app.get('/login', (req, res) => {
    res.render('login', { error: null });
});
app.get('/home', (req, res) => {
    res.render('home');
});
