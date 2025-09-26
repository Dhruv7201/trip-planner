import swaggerAutogen from 'swagger-autogen';
import * as fs from 'fs';
import * as path from 'path';

// Auto-generate swagger with watch mode for development
const generateSwagger = async () => {
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
  
  // Automatically find all route files
  const findRouteFiles = (dir: string): string[] => {
    const files: string[] = [];
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        files.push(...findRouteFiles(fullPath));
      } else if (item.endsWith('.ts') || item.endsWith('.js')) {
        files.push(fullPath);
      }
    }
    
    return files;
  };

  const routesDir = './routes';
  const endpointsFiles = findRouteFiles(routesDir);
  
  console.log('Found route files:', endpointsFiles);

  // Generate swagger documentation
  await swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc);
  console.log('✅ Swagger documentation generated successfully!');
};

// Run the generation
generateSwagger().catch(console.error);