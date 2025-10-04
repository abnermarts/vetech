import prismaClient from "../../prisma";

class ListAnimalService {
  async execute(sub: string): Promise<any> {
    const animalList = await prismaClient.customer.findMany({
      where: {
        relatedVeterinary: sub,
      },
      select: {
        id: true,
        customerName: true,
        customerFilho: {
          select: {
            animals: true,
          },
        },
      },
    });

    return animalList;
  }
}

export { ListAnimalService };
