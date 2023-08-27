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
        text: 'Verify Now',
        template: 'verify-email',
        context: {
          duration: moment
            .duration(this.jwtConfiguration.verifyTokenTtl, 's')
            .minutes(),
          verifyAccountLink: `${this.configService.get<string>(
            'backendUrl'
          )}/auth/verify-account?verifyToken=${verifyToken}`,
        },
      });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(
        'Failed to send email verification'
      );
    }
  }
}
