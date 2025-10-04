import prismaClient from "../../prisma";

class ListCustomerSonService {
  async execute(
    id_especie_animal?: number,
    relatedVeterinary?: string
  ): Promise<any> {
    const listSon = await prismaClient.filho.findMany({
      where: {
        id_especie_animal: id_especie_animal,
        Customer: {
          relatedVeterinary: relatedVeterinary,
        },
      },
      select: {
        Customer: {
          select: {
            customerName: true,
          },
        },
        id_especie_animal: true,
        nm_especie_animal: true,
        id: true,
        id_unidade_exploracao: true,
      },
    });

    return listSon;
  }
}

export { ListCustomerSonService };
