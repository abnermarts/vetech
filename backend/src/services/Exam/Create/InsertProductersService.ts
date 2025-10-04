import prismaClient from "../../../prisma";

class InsertProductersService {
  async execute(listProducters) {
    const insertProducters = await prismaClient.productersSelected.createManyAndReturn({
      data: listProducters,
    });

    return insertProducters;
  }
}

export { InsertProductersService };
