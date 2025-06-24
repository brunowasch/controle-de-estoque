const mongoose = require('mongoose');

const connectDB = async () => {
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Conectado ao MongoDB Atlas!'))
    .catch(err => console.error('Erro na conexão:', err));
};

module.exports = connectDB;