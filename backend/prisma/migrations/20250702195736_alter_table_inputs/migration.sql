/*
  Warnings:

  - You are about to drop the column `csFlag` on the `exame` table. All the data in the column will be lost.
  - You are about to drop the column `customerId` on the `exame` table. All the data in the column will be lost.
  - You are about to drop the column `idViewer` on the `exame` table. All the data in the column will be lost.
  - You are about to drop the column `nmDoencaAnimal` on the `exame` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `exame` table. All the data in the column will be lost.
  - You are about to drop the column `eventId` on the `exameanimals` table. All the data in the column will be lost.
  - You are about to drop the column `idExameDoenca` on the `exameanimals` table. All the data in the column will be lost.
  - You are about to drop the column `mensagemErro` on the `exameanimals` table. All the data in the column will be lost.
  - You are about to drop the column `send` on the `exameanimals` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "exameanimals" DROP CONSTRAINT "exameanimals_eventId_fkey";

-- AlterTable
ALTER TABLE "exame" DROP COLUMN "csFlag",
DROP COLUMN "customerId",
DROP COLUMN "idViewer",
DROP COLUMN "nmDoencaAnimal",
DROP COLUMN "status",
ADD COLUMN     "SendExame" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "eventId" TEXT,
ADD COLUMN     "mensagemErro" TEXT,
ALTER COLUMN "idDoencaAnimal" DROP DEFAULT;

-- AlterTable
ALTER TABLE "exameanimals" DROP COLUMN "eventId",
DROP COLUMN "idExameDoenca",
DROP COLUMN "mensagemErro",
DROP COLUMN "send";

-- AddForeignKey
ALTER TABLE "exame" ADD CONSTRAINT "exame_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE SET NULL ON UPDATE CASCADE;
