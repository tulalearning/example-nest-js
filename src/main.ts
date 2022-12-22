import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(process.env.PUBLIC_URL || '/api/v1.0');

  await app.listen(9000);
}
bootstrap();
