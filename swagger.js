const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Bakery API',
        description: 'Bakery app that allows customers to place orders for cakes and sweets'
    },
    host: 'cse341teamproject.onrender.com',
    schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

//generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);