import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'Trip Planner API',
    description: 'A simple trip planner API - Auto Generated',
    version: '1.0.0',
  },
  host: 'localhost:3000',
  basePath: '/api',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      name: 'Health',
      description: 'Health check endpoints'
    },
    {
      name: 'Authentication',
      description: 'Authentication related endpoints'
    },
    {
      name: 'Users',
      description: 'User management endpoints'
    }
  ],
  securityDefinitions: {
    bearerAuth: {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT'
    }
  },
  definitions: {
    HealthResponse: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          example: 'ok'
        }
      }
    },
    ProtectedResponse: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'You have access'
        },
        user: {
          type: 'object',
          description: 'User information from JWT token'
        }
      }
    },
    ErrorResponse: {
      type: 'object',
      properties: {
        error: {
          type: 'string',
          example: 'Unauthorized'
        }
      }
    }
  }
};

const outputFile = './swagger-output.json';
const endpointsFiles = [
  './routes/index.ts',
  './routes/user/index.ts'
];

// Generate swagger documentation
swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc);