import swaggerJsdoc from "swagger-jsdoc";

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'API documentation for your Node.js application',
        },
        servers: [
            {
                url: 'http://localhost:8001',
                description: 'Local server',
            },
        ],
    },
    apis: ['./dist/swaggerApi.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export default swaggerSpec