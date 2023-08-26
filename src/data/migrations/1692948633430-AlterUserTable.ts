import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterUserTable1692948633430 implements MigrationInterface {
  name = 'AlterUserTable1692948633430';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "googleId" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "password" DROP NOT NULL`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_470355432cc67b2c470c30bef7" ON "user" ("googleId") `
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_470355432cc67b2c470c30bef7"`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "password" SET NOT NULL`
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "googleId"`);
  }
}
