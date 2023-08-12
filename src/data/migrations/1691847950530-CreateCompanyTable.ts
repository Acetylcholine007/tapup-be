import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCompanyTable1691847950530 implements MigrationInterface {
  name = 'CreateCompanyTable1691847950530';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "company_p13n" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "companyTextColor" character varying, CONSTRAINT "PK_df2fc42a6dc2c52d51b8df39a97" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "company" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "personalizationId" uuid, CONSTRAINT "UQ_a76c5cd486f7779bd9c319afd27" UNIQUE ("name"), CONSTRAINT "REL_084284c510393f65db1b99d51a" UNIQUE ("personalizationId"), CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a76c5cd486f7779bd9c319afd2" ON "company" ("name") `
    );
    await queryRunner.query(`ALTER TABLE "business_card" ADD "companyId" uuid`);
    await queryRunner.query(
      `CREATE INDEX "IDX_e12875dfb3b1d92d7d7c5377e2" ON "user" ("email") `
    );
    await queryRunner.query(
      `ALTER TABLE "company" ADD CONSTRAINT "FK_084284c510393f65db1b99d51ab" FOREIGN KEY ("personalizationId") REFERENCES "company_p13n"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "business_card" ADD CONSTRAINT "FK_aae423d9c8f26d4271bf68a4dba" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE SET NULL ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "business_card" DROP CONSTRAINT "FK_aae423d9c8f26d4271bf68a4dba"`
    );
    await queryRunner.query(
      `ALTER TABLE "company" DROP CONSTRAINT "FK_084284c510393f65db1b99d51ab"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e12875dfb3b1d92d7d7c5377e2"`
    );
    await queryRunner.query(
      `ALTER TABLE "business_card" DROP COLUMN "companyId"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_a76c5cd486f7779bd9c319afd2"`
    );
    await queryRunner.query(`DROP TABLE "company"`);
    await queryRunner.query(`DROP TABLE "company_p13n"`);
  }
}
