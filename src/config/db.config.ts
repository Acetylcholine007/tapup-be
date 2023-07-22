import { registerAs } from '@nestjs/config';

export const dbConfiguration = {
  host: process.env.POSTGRES_HOST,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  port: +process.env.POSTGRES_PORT || 5432,
};

export default registerAs('database', () => ({
  ...dbConfiguration,
  type: 'postgres',
  autoLoadEntities: true,
  synchronize: false,
}));
