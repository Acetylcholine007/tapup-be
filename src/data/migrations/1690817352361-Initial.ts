import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1690817352361 implements MigrationInterface {
  name = 'Initial1690817352361';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "profileUrl" character varying, "telNo" character varying, "phoneNo" character varying, "viber" character varying, "whatsUp" character varying, "skype" character varying, "telegram" character varying, "role" character varying NOT NULL DEFAULT 'REGULAR', CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
