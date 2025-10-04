-- DropForeignKey
ALTER TABLE "customer" DROP CONSTRAINT "customer_relatedVeterinary_fkey";

-- AlterTable
ALTER TABLE "customer" ALTER COLUMN "relatedVeterinary" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "customer" ADD CONSTRAINT "customer_relatedVeterinary_fkey" FOREIGN KEY ("relatedVeterinary") REFERENCES "veterinarys"("id") ON DELETE SET NULL ON UPDATE CASCADE;
