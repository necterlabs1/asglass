import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import * as fs from 'fs';
import * as path from 'path';

async function bootstrap() {
  // Ensure uploads dir exists
  const uploadsDir = path.join(process.cwd(), 'uploads');
  if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

  const app = await NestFactory.create(AppModule);

  app.enableCors({ origin: 'http://localhost:3000', methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'] });
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  const port = process.env.PORT ?? 3001;
  await app.listen(port);
  console.log(`Burraa API running on http://localhost:${port}`);
}
bootstrap();
