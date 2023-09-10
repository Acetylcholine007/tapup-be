import jwtConfig from '@config/jwt.config';
import { MailerService } from '@nestjs-modules/mailer';
import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import * as moment from 'moment';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor(
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly configService: ConfigService,
    private readonly mailerService: MailerService
  ) {}

  async sendVerificationEmail(email: string, verifyToken: string) {
    try {
      return await this.mailerService.sendMail({
        to: email,
        subject: 'Tap Up Account Verification',
        template: 'verify-email',
        context: {
          duration: moment
            .duration(this.jwtConfiguration.verifyTokenTtl, 's')
            .minutes(),
          verifyAccountLink: `${this.configService.get<string>(
            'backendUrl'
          )}/api/auth/verify-account?verifyToken=${verifyToken}`,
        },
      });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(
        'Failed to send email verification'
      );
    }
  }

  async sendPasswordResetEmail(email: string, resetToken: string) {
    try {
      return await this.mailerService.sendMail({
        to: email,
        subject: 'Tap Up Password Reset',
        template: 'reset-password',
        context: {
          duration: moment
            .duration(this.jwtConfiguration.resetTokenTtl, 's')
            .minutes(),
          resetPasswordLink: `${this.configService.get<string>(
            'frontendUrl'
          )}${this.configService.get<string>(
            'passwordResetPath'
          )}?resetToken=${resetToken}`,
        },
      });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Failed to send password reset');
    }
  }
}
