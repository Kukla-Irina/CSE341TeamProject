const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Bakery API',
        description: 'Bakery app that allows customers to place orders for cakes and sweets'
    },
    host: 'localhost:3000',
    schemes: ['http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

//generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc); 