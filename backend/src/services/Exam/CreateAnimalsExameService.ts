import { Exame } from "@prisma/client";
import prismaClient from "../../prisma";

interface ExameAnimals {
  exame_id: string;
  animal_id: string;
}

class CreateAnimalsExameService {
  async execute(animals: ExameAnimals[]) {

    const createExameAnimals =
      await prismaClient.exameAnimals.createManyAndReturn({
        data: animals,
      });

    return createExameAnimals;
  }
}

export { CreateAnimalsExameService };
