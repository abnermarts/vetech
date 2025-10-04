import prismaClient from "../../../prisma";

class ListProductersService {
  async execute(id: string) {
    const listProducters = await prismaClient.productersSelected.findMany({
      where: { identificatorsId: id },
      select: {
        customer: {
          select: {
            id: true,
            customerName: true,
            cpf: true,
            customerFilho: {
              select: {
                id: true,
                id_unidade_exploracao: true,
                animals: true,
              }
            }
          }
        }
      },
    });
    

    return listProducters;
  }
}

export { ListProductersService };
