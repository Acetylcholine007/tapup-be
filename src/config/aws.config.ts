import { registerAs } from '@nestjs/config';

export default registerAs('aws', () => {
  return {
    accessKeyId: process.env.AWS_ACCESS_ID,
    secretAccessKey: process.env.AWS_ACCESS_KEY,
    region: process.env.AWS_REGION,
    s3Bucket: process.env.AWS_S3_BUCKET,
    s3Region: process.env.AWS_S3_REGION,
    s3PresignedUrlTtl: parseInt(process.env.AWS_S3_PU_TTL ?? '300', 10),
  };
});
