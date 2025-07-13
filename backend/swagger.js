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
        url: 'http://localhost:3000', // ajuste se estiver usando outra porta
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
  apis: ['./routes/*.js'], // Ele vai ler os comentários Swagger desses arquivos
};

module.exports = swaggerJSDoc(options);

