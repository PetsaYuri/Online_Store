import swaggerJSDoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'My API',
            version: '1.0.0',
            description: 'API docs'
        }
    },
    apis: ['./src/routes/*.ts']
};

const swaggerOptions: swaggerJSDoc.Options = swaggerJSDoc(options);
export default swaggerOptions;