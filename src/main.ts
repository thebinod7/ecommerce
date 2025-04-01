import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { APP_CONSTANT } from './constants/constants';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const PORT = process.env.PORT || 5000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const globalPrefix = 'api/v1';
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  app.setGlobalPrefix(globalPrefix);

  const config = new DocumentBuilder()
    .setTitle(APP_CONSTANT.NAME)
    .setDescription(APP_CONSTANT.DESCRIPTION)
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'JWT',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(PORT);
  Logger.log(`App running at port: ${PORT}`);
  Logger.log(`Swagger UI: http://localhost:${PORT}/swagger`);
}
bootstrap();
