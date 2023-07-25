import { DataSource } from 'typeorm';
import { dbConfiguration } from './db.config';

export default new DataSource({
  ...dbConfiguration,
  type: 'postgres',
  logging: true,
  entities: ['dist/data/entities/*.js'],
  migrations: ['dist/data/migrations/*.js'],
});
