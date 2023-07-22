import { CorsOptionsDelegate } from '@nestjs/common/interfaces/external/cors-options.interface';

const whitelist: string[] = process.env.CORS_WHITELIST
  ? process.env.CORS_WHITELIST.split(',')
  : [];
const allowedHeaders: string[] = process.env.CORS_ALLOWED_HEADERS
  ? process.env.CORS_ALLOWED_HEADERS.split(',')
  : [];

const exposedHeaders: string[] = process.env.CORS_EXPOSED_HEADERS
  ? process.env.CORS_EXPOSED_HEADERS.split(',')
  : [];

const origin = (
  requestOrigin: string | undefined,
  callback: (error: Error | null, origin?: boolean) => void
) => {
  if (whitelist.indexOf(requestOrigin) !== -1 || !requestOrigin) {
    return callback(null, true);
  }

  return callback(new Error('Not allowed by CORS'));
};

export default {
  origin,
  exposedHeaders,
  allowedHeaders,
} as unknown as CorsOptionsDelegate<any>;
