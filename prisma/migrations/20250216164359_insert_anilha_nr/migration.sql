/*
  Warnings:

  - Added the required column `diamAnilha` to the `animal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `relatedId` to the `exame` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "animal" ADD COLUMN     "diamAnilha" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "exame" ADD COLUMN     "relatedId" TEXT NOT NULL;
