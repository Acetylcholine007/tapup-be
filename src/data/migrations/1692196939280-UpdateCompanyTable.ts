import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateCompanyTable1692196939280 implements MigrationInterface {
  name = 'UpdateCompanyTable1692196939280';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "company" ADD "isVerified" boolean NOT NULL DEFAULT false`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "isVerified"`);
  }
}
