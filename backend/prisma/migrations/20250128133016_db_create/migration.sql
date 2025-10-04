-- CreateTable
CREATE TABLE "veterinarys" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "user" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "UF" TEXT NOT NULL,
    "csTipoAtuacao" TEXT NOT NULL,
    "idVeterinario" INTEGER NOT NULL,
    "nrCrmvVeterinario" TEXT NOT NULL,
    "nrDocumento" TEXT NOT NULL,

    CONSTRAINT "veterinarys_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customer" (
    "id" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "Municipio" TEXT,
    "Rua" TEXT,
    "Numero" TEXT,
    "idUnidadeExploracao" INTEGER NOT NULL,
    "customerName" TEXT NOT NULL,

    CONSTRAINT "customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customerfilho" (
    "id" TEXT NOT NULL,
    "idCustomerFather" TEXT NOT NULL,
    "id_especie_animal" INTEGER NOT NULL,
    "nm_especie_animal" TEXT NOT NULL,
    "id_unidade_exploracao" INTEGER NOT NULL,

    CONSTRAINT "customerfilho_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "animal" (
    "id" TEXT NOT NULL,
    "dsIdentificacaoAnimal" TEXT NOT NULL,
    "dsDataNascimento" TIMESTAMP(3) NOT NULL,
    "animalName" TEXT NOT NULL,
    "sexo" TEXT NOT NULL,
    "dsPelagem" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "specieId" INTEGER NOT NULL,

    CONSTRAINT "animal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "specie" (
    "scienceName" TEXT,
    "scienceAnimalId" INTEGER,
    "specieName" TEXT NOT NULL,
    "id" INTEGER NOT NULL,

    CONSTRAINT "specie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exame" (
    "id" TEXT NOT NULL,
    "veterinaryId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "idViewer" SERIAL NOT NULL,
    "csFlag" TEXT NOT NULL DEFAULT 'AT',
    "idDoencaAnimal" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "nmDoencaAnimal" TEXT NOT NULL DEFAULT 'Atestado Sanitário Silvestres',
    "customerId" TEXT NOT NULL,

    CONSTRAINT "exame_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exameanimals" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "idExameDoenca" INTEGER,
    "send" BOOLEAN DEFAULT false,
    "exame_id" TEXT NOT NULL,
    "animal_id" TEXT NOT NULL,

    CONSTRAINT "exameanimals_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "specie_id_key" ON "specie"("id");

-- AddForeignKey
ALTER TABLE "customerfilho" ADD CONSTRAINT "customerfilho_idCustomerFather_fkey" FOREIGN KEY ("idCustomerFather") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "animal" ADD CONSTRAINT "animal_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customerfilho"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "animal" ADD CONSTRAINT "animal_specieId_fkey" FOREIGN KEY ("specieId") REFERENCES "specie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exame" ADD CONSTRAINT "exame_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exame" ADD CONSTRAINT "exame_veterinaryId_fkey" FOREIGN KEY ("veterinaryId") REFERENCES "veterinarys"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exameanimals" ADD CONSTRAINT "exameanimals_animal_id_fkey" FOREIGN KEY ("animal_id") REFERENCES "animal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exameanimals" ADD CONSTRAINT "exameanimals_exame_id_fkey" FOREIGN KEY ("exame_id") REFERENCES "exame"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
