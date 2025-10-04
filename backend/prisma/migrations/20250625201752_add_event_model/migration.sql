-- AlterTable
ALTER TABLE "exameanimals" ADD COLUMN     "eventId" TEXT;

-- CreateTable
CREATE TABLE "event" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_unidade_exploracao" INTEGER NOT NULL,
    "nm_unidade_exploracao" TEXT NOT NULL,
    "nr_unidade_exploracao" INTEGER NOT NULL,
    "eventName" TEXT NOT NULL,
    "eventStatus" TEXT DEFAULT 'ACTIVE',

    CONSTRAINT "event_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "exameanimals" ADD CONSTRAINT "exameanimals_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE SET NULL ON UPDATE CASCADE;
