import { registerAs } from '@nestjs/config';

export default registerAs('mail', () => {
  return {
    getTransport() {
      switch (process.env.TRANSPORT_TYPE ?? 'preview') {
        case 'preview':
          return this.previewTransport;
        case 'gmail':
          return this.gmailTransport;
        case 'smtp':
          return this.smtpTransport;
        default:
          return this.previewTransport;
      }
    },
    host: process.env.MAIL_HOST,
    user: process.env.MAIL_USER,
    password: process.env.MAIL_PASSWORD,
    from: process.env.MAIL_FROM,
    smtpTransport: `smtp://${process.env.MAIL_USER}:${process.env.MAIL_PASSWORD}@${process.env.MAIL_HOST}`,
    gmailTransport: {
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    },
    previewTransport: {
      host: process.env.MAIL_HOST,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    },
  };
});
