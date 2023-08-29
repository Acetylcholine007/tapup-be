import { registerAs } from '@nestjs/config';

export default registerAs('crypto', () => {
  return {
    symmetricKey: process.env.SYMMETRIC_KEY,
    iv: process.env.IV,
  };
});
