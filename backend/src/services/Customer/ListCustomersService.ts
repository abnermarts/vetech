import prismaClient from "../../prisma";

class ListCustomerService {
  async execute(veterinaryId): Promise<any> {
    const listCustomerAnimal = await prismaClient.customer.findMany({
      where: {
        relatedVeterinary: veterinaryId,
      },
      select: {
        id: true,
        customerName: true,
        cpf: true,
        Municipio: true,
        Rua: true,
        Numero: true,
        connected: true,
        pass: true,
      },
    });

    return listCustomerAnimal;
  }
}

export { ListCustomerService };
