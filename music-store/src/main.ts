import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import expressBasicAuth from 'express-basic-auth';
import { ADMIN_LOGIN, ADMIN_PASSWORD } from './config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    expressBasicAuth({
      challenge: true,
      users: { [ADMIN_LOGIN]: ADMIN_PASSWORD },
    }),
  );

  app.enableCors();

  const PORT = Number(process.env.PORT) || 3000;
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      whitelist: true,
    }),
  );
  await app.listen(PORT);
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
}
bootstrap().catch((error) => console.error(error));
