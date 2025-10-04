import prismaClient from "../../prisma";

interface Specie {
    specieAnimalId: number,
    specieName: string,
    scienceAnimalId: number,
    scienceName: string,
}

class CreateSpecieService {
    async execute({specieAnimalId, specieName, scienceAnimalId, scienceName}: Specie){

        const createSpecie = await prismaClient.specie.create({
            data:{
                id: specieAnimalId,
                specieName: specieName,
                scienceAnimalId: scienceAnimalId,
                scienceName: scienceName,
            }
        })

        return createSpecie;

    }
}

export { CreateSpecieService };