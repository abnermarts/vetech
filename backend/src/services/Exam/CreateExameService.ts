import prismaClient from "../../prisma";

interface Exame {
  animal_id: string;
}

class CreateExameService {
  async execute(
    veterinaryId: string,
    filhoId: string,
    relatedId: string,
    animals: Exame[]
  ) {
    const createExame = await prismaClient.exame.create({
      data: {
        veterinaryId,
        filhoId,
        relatedId,
        exameAnimals: {
          create: animals.map((item) => ({
            animal_id: item.animal_id,
          })),
        },
      },
      include: {
        exameAnimals: true,
      },
    });

    return createExame;
  }
}

export { CreateExameService };
