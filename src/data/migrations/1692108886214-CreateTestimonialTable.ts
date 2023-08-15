import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTestimonialTable1692108886214 implements MigrationInterface {
  name = 'CreateTestimonialTable1692108886214';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "testimonial" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "rating" integer NOT NULL, "description" character varying NOT NULL, "userId" uuid, "businessCardId" uuid, CONSTRAINT "PK_e1aee1c726db2d336480c69f7cb" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "testimonial" ADD CONSTRAINT "FK_8455ac0da5f4cc082831516abb1" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "testimonial" ADD CONSTRAINT "FK_ef6172da57241b6cfd603987fba" FOREIGN KEY ("businessCardId") REFERENCES "business_card"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "testimonial" DROP CONSTRAINT "FK_ef6172da57241b6cfd603987fba"`
    );
    await queryRunner.query(
      `ALTER TABLE "testimonial" DROP CONSTRAINT "FK_8455ac0da5f4cc082831516abb1"`
    );
    await queryRunner.query(`DROP TABLE "testimonial"`);
  }
}
