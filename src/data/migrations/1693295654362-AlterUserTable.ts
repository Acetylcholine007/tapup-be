import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterUserTable1693295654362 implements MigrationInterface {
  name = 'AlterUserTable1693295654362';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "business_card_p13n" ADD "companyTextColor" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "business_card_p13n" ADD "testimonialBackgroundColor" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "business_card_p13n" ADD "testimonialTextColor" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "business_card_p13n" ADD "testimonialBorderRadius" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "business_card_p13n" ADD "testimonialBorderColor" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "isTfaEnabled" boolean NOT NULL DEFAULT false`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "tfaSecret" character varying`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "tfaSecret"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isTfaEnabled"`);
    await queryRunner.query(
      `ALTER TABLE "business_card_p13n" DROP COLUMN "testimonialBorderColor"`
    );
    await queryRunner.query(
      `ALTER TABLE "business_card_p13n" DROP COLUMN "testimonialBorderRadius"`
    );
    await queryRunner.query(
      `ALTER TABLE "business_card_p13n" DROP COLUMN "testimonialTextColor"`
    );
    await queryRunner.query(
      `ALTER TABLE "business_card_p13n" DROP COLUMN "testimonialBackgroundColor"`
    );
    await queryRunner.query(
      `ALTER TABLE "business_card_p13n" DROP COLUMN "companyTextColor"`
    );
  }
}
