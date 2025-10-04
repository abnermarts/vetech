import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.sexo.upsert({
    where: { id: "1" },
    update: {},
    create: {
      id: "1",
      csFlag: "MA",
      dsFlag: "Macho",
      idToDb: crypto.randomUUID(),
    },
  });
  await prisma.sexo.upsert({
    where: { id: "2" },
    update: {},
    create: {
      id: "2",
      csFlag: "FE",
      dsFlag: "Fêmea",
      idToDb: crypto.randomUUID(),
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
