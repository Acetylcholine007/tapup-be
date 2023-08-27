import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterUserTable1693018672741 implements MigrationInterface {
  name = 'AlterUserTable1693018672741';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "isVerified" boolean NOT NULL DEFAULT false`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isVerified"`);
  }
}
