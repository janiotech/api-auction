import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): Object {
    return {
      message: 'Welcome to our API',
      version: '1.0.0',
      documentation: 'https://example.com/api-docs',
    };
  }
}
