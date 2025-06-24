const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Atlas conectado com sucesso!'))
.catch((err) => console.error('Erro ao conectar no MongoDB:', err));
