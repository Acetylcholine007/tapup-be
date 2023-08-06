import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAmenityTable1691340868130 implements MigrationInterface {
  name = 'CreateAmenityTable1691340868130';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "business_card" DROP CONSTRAINT "FK_de4a1a3f4ce0a8f585d74173c9c"`
    );
    await queryRunner.query(
      `CREATE TABLE "amenity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying, "description" character varying, "cardPhoto" character varying, "businessCardId" uuid, "personalizationId" uuid, CONSTRAINT "REL_fa6661b74f7fa7187ed1e66f17" UNIQUE ("personalizationId"), CONSTRAINT "PK_f981de7b1a822823e5f31da10dc" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "amenity_p13n" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "primaryBackgroundColor" character varying, "secondaryBackgroundColor" character varying, "primaryTextColor" character varying, "secondaryTextColor" character varying, "borderColor" character varying, "borderRadius" character varying, CONSTRAINT "PK_7e85df5c6b8a44dcac8cb7e65fd" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "business_card" ADD CONSTRAINT "FK_de4a1a3f4ce0a8f585d74173c9c" FOREIGN KEY ("personalizationId") REFERENCES "business_card_p13n"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "amenity" ADD CONSTRAINT "FK_dd09330e3d011e66eeb7ca965bb" FOREIGN KEY ("businessCardId") REFERENCES "business_card"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "amenity" ADD CONSTRAINT "FK_fa6661b74f7fa7187ed1e66f174" FOREIGN KEY ("personalizationId") REFERENCES "amenity_p13n"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "amenity" DROP CONSTRAINT "FK_fa6661b74f7fa7187ed1e66f174"`
    );
    await queryRunner.query(
      `ALTER TABLE "amenity" DROP CONSTRAINT "FK_dd09330e3d011e66eeb7ca965bb"`
    );
    await queryRunner.query(
      `ALTER TABLE "business_card" DROP CONSTRAINT "FK_de4a1a3f4ce0a8f585d74173c9c"`
    );
    await queryRunner.query(`DROP TABLE "amenity_p13n"`);
    await queryRunner.query(`DROP TABLE "amenity"`);
    await queryRunner.query(
      `ALTER TABLE "business_card" ADD CONSTRAINT "FK_de4a1a3f4ce0a8f585d74173c9c" FOREIGN KEY ("personalizationId") REFERENCES "business_card_p13n"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
}
