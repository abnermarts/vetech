/*
  Warnings:

  - You are about to drop the column `sexo` on the `animal` table. All the data in the column will be lost.
  - Added the required column `sexoId` to the `animal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "animal" DROP COLUMN "sexo",
ADD COLUMN     "sexoId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "sexo" (
    "id" TEXT NOT NULL,
    "csFlag" TEXT NOT NULL,
    "dsFlag" TEXT NOT NULL,

    CONSTRAINT "sexo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "animal" ADD CONSTRAINT "animal_sexoId_fkey" FOREIGN KEY ("sexoId") REFERENCES "sexo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
