import { DataSource } from 'typeorm';
import { dbConfiguration } from './db.config';

export default new DataSource({
  ...dbConfiguration,
  type: 'postgres',
  logging: true,
  entities: ['dist/src/**/entities/*.js'],
  migrations: ['dist/src/migrations/*.js'],
});
