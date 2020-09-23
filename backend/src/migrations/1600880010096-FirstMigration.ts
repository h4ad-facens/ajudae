import { MigrationInterface, QueryRunner } from 'typeorm';

export class FirstMigration1600880010096 implements MigrationInterface {
  name = 'FirstMigration1600880010096';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT true, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "roles" character varying NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "ongs" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT true, "name" character varying NOT NULL, "email" character varying NOT NULL, "color" character varying NOT NULL, "image" character varying NOT NULL, "whatsapp" character varying NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_bcd0edd4e9d5fb34b6e0b8c06d2" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "causes" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT true, "categories" character varying(256) NOT NULL, "description" text NOT NULL, "expiresAt" bigint NOT NULL, "ongId" integer NOT NULL, CONSTRAINT "PK_5f2a74a26cb4e00f1f4a1723486" PRIMARY KEY ("id"))`);
    await queryRunner.query(`ALTER TABLE "ongs" ADD CONSTRAINT "FK_b227960f3249b2ab55df7fb19a1" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "causes" ADD CONSTRAINT "FK_2823f4fb28f7a71daabae16da80" FOREIGN KEY ("ongId") REFERENCES "ongs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "causes" DROP CONSTRAINT "FK_2823f4fb28f7a71daabae16da80"`);
    await queryRunner.query(`ALTER TABLE "ongs" DROP CONSTRAINT "FK_b227960f3249b2ab55df7fb19a1"`);
    await queryRunner.query(`DROP TABLE "causes"`);
    await queryRunner.query(`DROP TABLE "ongs"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }

}
