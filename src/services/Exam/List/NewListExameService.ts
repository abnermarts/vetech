import prismaClient from "../../../prisma";

class NewListExameService {
  async execute(veterinaryId: string, id?: string | undefined) {
    const where: any = {};
    if (veterinaryId) where.veterinaryId = veterinaryId;
    if (id) where.relatedId = id;

    const exames = await prismaClient.exame.findMany({
      where,
      select: {
        id: true,
        created_at: true,
        event: true,
        idExameDoenca: true,
        SendExame: true,
        filho: {
          select: {
            nm_especie_animal: true,
            Customer: {
              select: {
                customerName: true,
                cpf: true,
              },
            },
          },
        },
        exameAnimals: {
          select: {
            animals: true,
          },
        },
        errorTableExame: true
      },
      orderBy: {
        created_at: "desc",
      }
    });

    return exames;
  }
}

export { NewListExameService };
