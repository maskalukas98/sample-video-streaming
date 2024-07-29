import swaggerJsdoc from "swagger-jsdoc";

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'API documentation for video-service',
        },
        servers: [
            {
                url: 'http://localhost:8000',
                description: 'Local server',
            },
        ],
    },
    apis: ['./dist/swaggerApi.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export default swaggerSpec