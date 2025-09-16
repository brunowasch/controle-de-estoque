const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Documentação da API',
      version: '1.0.0',
      description: 'API do seu sistema com autenticação, produtos, clientes e fornecedores.',
    },
    servers: [
      {
        url: `https://controle-de-estoque-ln0d.onrender.com/`,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./routes/*.js'], 
};

module.exports = swaggerJSDoc(options);

