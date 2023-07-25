import { DataSource } from 'typeorm';
import { dbConfiguration } from './db.config';

export const seederConfig = new DataSource({
  ...dbConfiguration,
  type: 'postgres',
  entities: ['dist/data/entities/*.js'],
  migrations: ['dist/data/seeders/*.js'],
  migrationsTableName: 'seeders',
});
