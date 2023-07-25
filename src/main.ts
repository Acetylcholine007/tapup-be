import corsConfig from '@config/cors.config';
import { AppModule } from '@modules/app.module';
import { INestApplication, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';

async function bootstrap() {
  const logger = new Logger('Bootstrap', { timestamp: true });
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);

  app.setGlobalPrefix('api');
  app.enableCors(corsConfig);
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');

  if (configService.get('environment') !== 'production') {
    setupSwagger(app, configService);
  }

  await app.listen(configService.get('port'), '0.0.0.0').then(async () => {
    logger.log(`✅ Application is running on: ${await app.getUrl()}`);

    if (configService.get('environment') === 'production') return;
    console.info(`Server Details:
        port: ${configService.get('port')}
        environment: ${configService.get('environment')}
        Swagger Documentation: ${await app.getUrl()}/documentation
        GraphQL Playground: ${await app.getUrl()}/graphql
        `);
  });
}

bootstrap().catch((error) => {
  Logger.error('❌ Error starting server', error, 'NestJS', false);
  throw error;
});

async function setupSwagger(
  app: INestApplication,
  configService: ConfigService
) {
  const documentBuilder = new DocumentBuilder()
    .setTitle(configService.get('appName'))
    .setDescription('REST API for TapUp App')
    .addBearerAuth();

  if (configService.get('apiVersion')) {
    documentBuilder.setVersion(configService.get('apiVersion'));
  }

  const document = SwaggerModule.createDocument(app, documentBuilder.build());
  SwaggerModule.setup('/documentation', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      operationsSorter: 'method',
    },
  });
}
