import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSocialMediaTable1691942579369 implements MigrationInterface {
  name = 'CreateSocialMediaTable1691942579369';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "social-media" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "UQ_94cbd10d25c8fc4de6021a85497" UNIQUE ("name"), CONSTRAINT "PK_a56c5ed67b4c41159e29552466c" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_94cbd10d25c8fc4de6021a8549" ON "social-media" ("name") `
    );
    await queryRunner.query(
      `CREATE TABLE "social-media-mapping" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "link" character varying NOT NULL, "socialMediaId" uuid, "businessCardId" uuid, CONSTRAINT "PK_844d7e49e59cad9dd5d792e8603" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "social-media-mapping" ADD CONSTRAINT "FK_07fe3afd6ea73b9c51c3703afb8" FOREIGN KEY ("socialMediaId") REFERENCES "social-media"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "social-media-mapping" ADD CONSTRAINT "FK_1cd15b86d3ef156fa503a388eb4" FOREIGN KEY ("businessCardId") REFERENCES "business_card"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "social-media-mapping" DROP CONSTRAINT "FK_1cd15b86d3ef156fa503a388eb4"`
    );
    await queryRunner.query(
      `ALTER TABLE "social-media-mapping" DROP CONSTRAINT "FK_07fe3afd6ea73b9c51c3703afb8"`
    );
    await queryRunner.query(`DROP TABLE "social-media-mapping"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_94cbd10d25c8fc4de6021a8549"`
    );
    await queryRunner.query(`DROP TABLE "social-media"`);
  }
}
