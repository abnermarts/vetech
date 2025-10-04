/*
  Warnings:

  - Added the required column `cdOficialFormatado` to the `customerfilho` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idMunicipio` to the `customerfilho` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idPessoa` to the `customerfilho` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idPropriedade` to the `customerfilho` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idUF` to the `customerfilho` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nmLocalidade` to the `customerfilho` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uf` to the `customerfilho` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cd_oficial_formatado` to the `event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventId` to the `event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nm_pessoa` to the `event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pessoaTitularId` to the `event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "customerfilho" ADD COLUMN     "cdOficialFormatado" TEXT NOT NULL,
ADD COLUMN     "idMunicipio" INTEGER NOT NULL,
ADD COLUMN     "idPessoa" INTEGER NOT NULL,
ADD COLUMN     "idPropriedade" INTEGER NOT NULL,
ADD COLUMN     "idUF" INTEGER NOT NULL,
ADD COLUMN     "nmLocalidade" TEXT NOT NULL,
ADD COLUMN     "uf" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "event" ADD COLUMN     "cd_oficial_formatado" TEXT NOT NULL,
ADD COLUMN     "cs_flag" TEXT,
ADD COLUMN     "ds_flag" TEXT,
ADD COLUMN     "eventId" INTEGER NOT NULL,
ADD COLUMN     "id_municipio" INTEGER,
ADD COLUMN     "nm_localidade" TEXT,
ADD COLUMN     "nm_municipio" TEXT,
ADD COLUMN     "nm_pessoa" TEXT NOT NULL,
ADD COLUMN     "pessoaTitularId" TEXT NOT NULL,
ADD COLUMN     "sg_uf" TEXT;

-- AlterTable
ALTER TABLE "veterinarys" ADD COLUMN     "passwordSigen" TEXT,
ADD COLUMN     "userSigen" TEXT;
