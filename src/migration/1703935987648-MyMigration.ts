import { MigrationInterface, QueryRunner } from "typeorm";

export class MyMigration1703935987648 implements MigrationInterface {
    name = 'MyMigration1703935987648'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "admins" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_e3b38270c97a854c48d2e80874e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "articles" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" text NOT NULL, "image" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(), "authorIdId" integer, CONSTRAINT "PK_0a6e2c450d83e0b6052c2793334" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "parties" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "leader" character varying NOT NULL, "image" character varying NOT NULL, "visimisi" text array NOT NULL, "address" character varying, CONSTRAINT "PK_da698299dca60d55f0050dde935" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "paslons" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "image" character varying NOT NULL, "visimisi" text array NOT NULL, "coalition" text array, CONSTRAINT "PK_fb7268cc991dfa9da1aa9c02941" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "voters" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "fullName" character varying NOT NULL, "address" character varying, "gender" character varying, "paslonIdId" integer, CONSTRAINT "PK_a58842a42a7c48bc3efebb0a305" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "articles" ADD CONSTRAINT "FK_606e78968e0ec66b01a08573672" FOREIGN KEY ("authorIdId") REFERENCES "admins"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "voters" ADD CONSTRAINT "FK_bd649d9eaa9c4b6b113055e5be5" FOREIGN KEY ("paslonIdId") REFERENCES "paslons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "voters" DROP CONSTRAINT "FK_bd649d9eaa9c4b6b113055e5be5"`);
        await queryRunner.query(`ALTER TABLE "articles" DROP CONSTRAINT "FK_606e78968e0ec66b01a08573672"`);
        await queryRunner.query(`DROP TABLE "voters"`);
        await queryRunner.query(`DROP TABLE "paslons"`);
        await queryRunner.query(`DROP TABLE "parties"`);
        await queryRunner.query(`DROP TABLE "articles"`);
        await queryRunner.query(`DROP TABLE "admins"`);
    }

}
