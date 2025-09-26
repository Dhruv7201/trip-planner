import { Router, Request, Response } from 'express';
import { authenticate } from '../middleware/auth';
import {
  SwaggerRoute,
  SwaggerMethod,
  SwaggerTags,
  SwaggerSummary,
  SwaggerDescription,
  SwaggerResponses,
  SwaggerSecurity
} from '../utils/swagger-decorators';

class ApiController {
  @SwaggerRoute('/health')
  @SwaggerMethod('GET')
  @SwaggerTags(['Health'])
  @SwaggerSummary('Health check endpoint')
  @SwaggerDescription('Returns the health status of the API')
  @SwaggerResponses({
    '200': {
      description: 'API is healthy',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              status: {
                type: 'string',
                example: 'ok'
              }
            }
          }
        }
      }
    }
  })
  healthCheck(req: Request, res: Response) {
    res.json({ status: 'ok' });
  }

  @SwaggerRoute('/protected')
  @SwaggerMethod('GET')
  @SwaggerTags(['Authentication'])
  @SwaggerSummary('Protected endpoint')
  @SwaggerDescription('Access a protected resource (requires authentication)')
  @SwaggerSecurity([{ bearerAuth: [] }])
  @SwaggerResponses({
    '200': {
      description: 'Successful access to protected resource',
      content: {
        'application/json': {
          schema: {
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
          }
        }
      }
    },
    '401': {
      description: 'Unauthorized - Invalid or missing token',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              error: {
                type: 'string',
                example: 'Unauthorized'
              }
            }
          }
        }
      }
    }
  })
  protectedEndpoint(req: Request, res: Response) {
    res.json({ message: 'You have access', user: (req as any).user });
  }
}

// Create router and bind methods
const router = Router();
const controller = new ApiController();

// Bind routes with middleware
router.get('/health', controller.healthCheck.bind(controller));
router.get('/protected', authenticate, controller.protectedEndpoint.bind(controller));

export default router;
export { ApiController };