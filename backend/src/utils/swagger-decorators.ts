import 'reflect-metadata';

// Metadata keys
const SWAGGER_METHOD_KEY = Symbol('swagger:method');
const SWAGGER_PATH_KEY = Symbol('swagger:path');
const SWAGGER_TAGS_KEY = Symbol('swagger:tags');
const SWAGGER_SUMMARY_KEY = Symbol('swagger:summary');
const SWAGGER_DESCRIPTION_KEY = Symbol('swagger:description');
const SWAGGER_RESPONSES_KEY = Symbol('swagger:responses');
const SWAGGER_SECURITY_KEY = Symbol('swagger:security');

// Decorators
export function SwaggerRoute(path: string) {
  return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
    Reflect.defineMetadata(SWAGGER_PATH_KEY, path, target, propertyName);
  };
}

export function SwaggerMethod(method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH') {
  return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
    Reflect.defineMetadata(SWAGGER_METHOD_KEY, method.toLowerCase(), target, propertyName);
  };
}

export function SwaggerTags(tags: string[]) {
  return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
    Reflect.defineMetadata(SWAGGER_TAGS_KEY, tags, target, propertyName);
  };
}

export function SwaggerSummary(summary: string) {
  return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
    Reflect.defineMetadata(SWAGGER_SUMMARY_KEY, summary, target, propertyName);
  };
}

export function SwaggerDescription(description: string) {
  return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
    Reflect.defineMetadata(SWAGGER_DESCRIPTION_KEY, description, target, propertyName);
  };
}

export function SwaggerResponses(responses: Record<string, any>) {
  return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
    Reflect.defineMetadata(SWAGGER_RESPONSES_KEY, responses, target, propertyName);
  };
}

export function SwaggerSecurity(security: any[]) {
  return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
    Reflect.defineMetadata(SWAGGER_SECURITY_KEY, security, target, propertyName);
  };
}

// Helper function to extract swagger info from a class
export function extractSwaggerInfo(target: any): any {
  const prototype = target.prototype || target;
  const methodNames = Object.getOwnPropertyNames(prototype);
  const paths: any = {};

  for (const methodName of methodNames) {
    if (methodName === 'constructor') continue;

    const path = Reflect.getMetadata(SWAGGER_PATH_KEY, prototype, methodName);
    const method = Reflect.getMetadata(SWAGGER_METHOD_KEY, prototype, methodName);
    const tags = Reflect.getMetadata(SWAGGER_TAGS_KEY, prototype, methodName);
    const summary = Reflect.getMetadata(SWAGGER_SUMMARY_KEY, prototype, methodName);
    const description = Reflect.getMetadata(SWAGGER_DESCRIPTION_KEY, prototype, methodName);
    const responses = Reflect.getMetadata(SWAGGER_RESPONSES_KEY, prototype, methodName);
    const security = Reflect.getMetadata(SWAGGER_SECURITY_KEY, prototype, methodName);

    if (path && method) {
      if (!paths[path]) {
        paths[path] = {};
      }

      paths[path][method] = {
        ...(tags && { tags }),
        ...(summary && { summary }),
        ...(description && { description }),
        ...(responses && { responses }),
        ...(security && { security })
      };
    }
  }

  return { paths };
}