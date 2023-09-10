import { registerAs } from '@nestjs/config';

export default registerAs('mail', () => {
  return {
    getTransport() {
      switch (process.env.TRANSPORT_TYPE ?? 'gmailTransport') {
        case 'gmail':
          return this.gmailTransport;
        case 'ses':
          return this.sesTransport;
        default:
          return this.gmailTransport;
      }
    },
    host: process.env.MAIL_HOST,
    user: process.env.MAIL_USER,
    password: process.env.MAIL_PASSWORD,
    from: process.env.MAIL_FROM,
    gmailTransport: {
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    },
    sesTransport: {
      host: 'email-smtp.ap-southeast-1.amazonaws.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.AWS_SES_ACCESS_ID,
        pass: process.env.AWS_SES_ACCESS_KEY,
      },
    },
  };
});
