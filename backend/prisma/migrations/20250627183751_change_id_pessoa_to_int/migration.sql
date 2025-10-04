/*
  Warnings:

  - Added the required column `idPessoa` to the `veterinarys` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "veterinarys" DROP COLUMN "idPessoa",
ADD COLUMN     "idPessoa" INTEGER NOT NULL;
