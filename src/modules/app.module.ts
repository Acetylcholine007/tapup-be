import { HttpExceptionFilter } from '@common/filters/http-exception/http-exception.filter';
import { AccessTokenGuard } from '@common/guards/access-token.guard';
import { RolesGuard } from '@common/guards/roles.guard';
import { TimeoutInterceptor } from '@common/interceptors/timeout/timeout.interceptor';
import appConfig from '@config/app.config';
import dbConfig from '@config/db.config';

import {
  ClassSerializerInterceptor,
  Module,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AcceptLanguageResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import { join } from 'path';
import { AmenityModule } from './amenity/amenity.module';
import { AuthModule } from './auth/auth.module';
import { BusinessCardModule } from './business-card/business-card.module';
import { CompanyModule } from './company/company.module';
import { CryptoModule } from './crypto/crypto.module';
import { MailModule } from './mail/mail.module';
import { SocialMediaModule } from './social-media/social-media.module';
import { TestimonialModule } from './testimonial/testimonial.module';
import { UserModule } from './user/user.module';
import { FileModule } from './file/file.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [appConfig, dbConfig] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get<TypeOrmModuleOptions>('database'),
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: join(__dirname, '../i18n/'),
        watch: true,
      },
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
      ],
    }),
    UserModule,
    AuthModule,
    CryptoModule,
    BusinessCardModule,
    AmenityModule,
    CompanyModule,
    SocialMediaModule,
    TestimonialModule,
    MailModule,
    FileModule,
    HealthModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
      }),
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TimeoutInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
