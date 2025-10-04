import prismaClient from "../../prisma";

interface Animal {
  dsDataNascimento: Date;
  dsPelagem: string;
  sexoId: string;
  specieId: number;
  customerId: string;
  diamAnilha: string;
}

class CreateAnimalService {
  async execute({
    dsDataNascimento,
    dsPelagem,
    sexoId,
    specieId,
    customerId,
    diamAnilha,
  }: Animal) {
    const animalExist = await prismaClient.animal.findFirst({
      where: {
        dsDataNascimento: dsDataNascimento,
        dsPelagem: dsPelagem,
        sexoId: sexoId,
        specieId: specieId,
        diamAnilha: diamAnilha,
      },
    });

    if (animalExist) {
      throw new Error("Animal já existe.");
    }

    const specieExist = await prismaClient.specie.findFirst({
      where: {
        id: specieId,
      },
    });

    if (!specieExist) {
      throw new Error("Espécie não existe");
    }

    const createAnimal = await prismaClient.animal.create({
      data: {
        dsIdentificacaoAnimal: specieExist.specieName,
        dsDataNascimento: dsDataNascimento,
        dsPelagem: dsPelagem,
        animalName: specieExist.specieName,
        sexoId: sexoId,
        specieId: specieId,
        customerId: customerId,
        diamAnilha: diamAnilha,
      },
    });

    return createAnimal;
  }
}

export { CreateAnimalService };
