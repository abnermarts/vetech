import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const species = [
    { id: 115, specieName: "Coleirinho Ou Papa-Capim" },
    { id: 439, specieName: "Papa-Capim" },
    { id: 109, specieName: "Canário" },
    { id: 760, specieName: "Tiziu" },
    { id: 715, specieName: "Azulão Da Amazônia" },
    { id: 100, specieName: "Azulão" },
    { id: 93, specieName: "Trinca-Ferro" },
    { id: 442, specieName: "Pimentão" },
    { id: 102, specieName: "Bico De Pimenta" },
    { id: 111, specieName: "Canário Da Terra" },
  ];

  for (const specie of species) {
    await prisma.specie.upsert({
      where: { id: specie.id },
      update: {},
      create: {
        id: specie.id,
        specieName: specie.specieName,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
