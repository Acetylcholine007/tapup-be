import { registerAs } from '@nestjs/config';

export default registerAs('google', () => {
  return {
    clientId: process.env.GOOGLE_CLIENT_ID,
    secret: process.env.GOOGLE_CLIENT_SECRET,
    callback: process.env.GOOGLE_CLIENT_CALLBACK,
  };
});
