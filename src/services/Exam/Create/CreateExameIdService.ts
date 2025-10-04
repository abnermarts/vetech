import prismaClient from "../../../prisma";

class CreateExameIdService {
  async execute(identificatorsId: string) {
    const createExame = await prismaClient.identificators.create({
        data: {
          id: identificatorsId}
    })

    return createExame;
  }
}

export { CreateExameIdService };
