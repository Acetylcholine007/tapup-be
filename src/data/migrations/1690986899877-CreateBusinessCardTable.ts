import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateBusinessCardTable1690986899877
  implements MigrationInterface
{
  name = 'CreateBusinessCardTable1690986899877';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "business_card" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "businessHours" json NOT NULL, "backgroundUrl" character varying, "position" character varying, "telNo" character varying, "phoneNo" character varying, "viber" character varying, "whatsUp" character varying, "skype" character varying, "telegram" character varying, "userId" uuid, "personalizationId" uuid, CONSTRAINT "REL_de4a1a3f4ce0a8f585d74173c9" UNIQUE ("personalizationId"), CONSTRAINT "PK_b376b6a682a52b2dab5022af9a1" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "business_card_p13n" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "dayTextColor" character varying, "timeTextColor" character varying, "cardBackgroundColor" character varying, "overallBackgroundColor" character varying, "coverBackgroundColor" character varying, "borderRadius" character varying, "borderColor" character varying, CONSTRAINT "PK_9912797932511017e3c44e06776" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "business_card" ADD CONSTRAINT "FK_b602e731eb6680be1e0d25eee73" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "business_card" ADD CONSTRAINT "FK_de4a1a3f4ce0a8f585d74173c9c" FOREIGN KEY ("personalizationId") REFERENCES "business_card_p13n"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "business_card" DROP CONSTRAINT "FK_de4a1a3f4ce0a8f585d74173c9c"`
    );
    await queryRunner.query(
      `ALTER TABLE "business_card" DROP CONSTRAINT "FK_b602e731eb6680be1e0d25eee73"`
    );
    await queryRunner.query(`DROP TABLE "business_card_p13n"`);
    await queryRunner.query(`DROP TABLE "business_card"`);
  }
}
