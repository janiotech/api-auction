import { NestFactory } from '@nestjs/core';
import { AppModule } from './Modules/main/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://127.0.0.1:5500', // Permite apenas esta origem (pode ser mais específico ou usar '*')
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  await app.listen(3000);
}
bootstrap();
