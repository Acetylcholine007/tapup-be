import { DataSource } from 'typeorm';
import { dbConfiguration } from './db.config';

export const seederConfig = new DataSource({
  ...dbConfiguration,
  type: 'postgres',
  entities: ['dist/src/**/entities/*.js'],
  migrations: ['dist/src/data/seeders/*.js'],
  migrationsTableName: 'seeders',
});
