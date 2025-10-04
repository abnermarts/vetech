/*
  Warnings:

  - The primary key for the `sexo` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The required column `idToDb` was added to the `sexo` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "animal" DROP CONSTRAINT "animal_sexoId_fkey";

-- AlterTable
ALTER TABLE "sexo" DROP CONSTRAINT "sexo_pkey",
ADD COLUMN     "idToDb" TEXT NOT NULL,
ADD CONSTRAINT "sexo_pkey" PRIMARY KEY ("idToDb");

-- AddForeignKey
ALTER TABLE "animal" ADD CONSTRAINT "animal_sexoId_fkey" FOREIGN KEY ("sexoId") REFERENCES "sexo"("idToDb") ON DELETE RESTRICT ON UPDATE CASCADE;
