import jwtConfig from '@config/jwt.config';
import mailConfig from '@config/mail.config';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config';
import { join } from 'path';
import { MailService } from './services/mail.service';

@Module({
  imports: [
    ConfigModule.forFeature(jwtConfig),
    MailerModule.forRootAsync({
      imports: [ConfigModule.forFeature(mailConfig)],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const mailConfiguration: ConfigType<typeof mailConfig> =
          configService.get('mail');
        return {
          transport: mailConfiguration.getTransport(),
          defaults: {
            from: `"No Reply" <${mailConfiguration.from}>`,
          },
          preview: true,
          template: {
            dir: join(__dirname, '../../templates/'),
            adapter: new HandlebarsAdapter(undefined, {
              inlineCssEnabled: true,
              // inlineCssOptions: { url: '', preserveMediaQueries: true },
            }),
            options: {
              strict: true,
            },
          },
        };
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
