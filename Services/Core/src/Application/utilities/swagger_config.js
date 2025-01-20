import swaggerAutogen from "swagger-autogen"

const doc = {
    info: {
        title: 'API Documentation',
        version: '1.0.0',
        description: 'NEX Core Service API',
    },
    host: '192.168.129.23:3003',
    schemes: ['https'],
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['../../Presentation/routes.js']; 

swaggerAutogen()(outputFile, endpointsFiles, doc);
