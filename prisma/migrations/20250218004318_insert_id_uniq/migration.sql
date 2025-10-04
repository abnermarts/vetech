/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `sexo` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "animal" DROP CONSTRAINT "animal_sexoId_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "sexo_id_key" ON "sexo"("id");

-- AddForeignKey
ALTER TABLE "animal" ADD CONSTRAINT "animal_sexoId_fkey" FOREIGN KEY ("sexoId") REFERENCES "sexo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
