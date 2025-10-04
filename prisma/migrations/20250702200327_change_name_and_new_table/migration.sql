/*
  Warnings:

  - You are about to drop the column `idDoencaAnimal` on the `exame` table. All the data in the column will be lost.
  - You are about to drop the column `mensagemErro` on the `exame` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "exame" DROP COLUMN "idDoencaAnimal",
DROP COLUMN "mensagemErro",
ADD COLUMN     "idExameDoenca" INTEGER;

-- CreateTable
CREATE TABLE "errortableexame" (
    "id" TEXT NOT NULL,
    "exame_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "text" TEXT,

    CONSTRAINT "errortableexame_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "errortableexame" ADD CONSTRAINT "errortableexame_exame_id_fkey" FOREIGN KEY ("exame_id") REFERENCES "exame"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
