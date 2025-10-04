-- 1. Adiciona a coluna como opcional
ALTER TABLE "customer" ADD COLUMN "relatedVeterinary" TEXT;

-- 2. Atualiza os registros existentes
UPDATE "customer" SET "relatedVeterinary" = 'eedc6a4b-d49f-4552-b800-2544e4b47f79' WHERE "relatedVeterinary" IS NULL;

-- 3. Torna a coluna obrigatória
ALTER TABLE "customer" ALTER COLUMN "relatedVeterinary" SET NOT NULL;

-- 4. Adiciona a foreign key
ALTER TABLE "customer" ADD CONSTRAINT "customer_relatedVeterinary_fkey" FOREIGN KEY ("relatedVeterinary") REFERENCES "veterinarys"("id") ON DELETE RESTRICT ON UPDATE CASCADE;