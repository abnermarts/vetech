/*
  Warnings:

  - Added the required column `filhoId` to the `exame` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "exame" DROP CONSTRAINT "exame_customerId_fkey";

-- AlterTable
ALTER TABLE "exame" ADD COLUMN     "filhoId" TEXT NOT NULL,
ALTER COLUMN "customerId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "identificators" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "identificators_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "productersselected" (
    "id" TEXT NOT NULL,
    "identificatorsId" TEXT NOT NULL,
    "producterId" TEXT NOT NULL,

    CONSTRAINT "productersselected_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "productersselected" ADD CONSTRAINT "productersselected_identificatorsId_fkey" FOREIGN KEY ("identificatorsId") REFERENCES "identificators"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productersselected" ADD CONSTRAINT "productersselected_producterId_fkey" FOREIGN KEY ("producterId") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exame" ADD CONSTRAINT "exame_filhoId_fkey" FOREIGN KEY ("filhoId") REFERENCES "customerfilho"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
