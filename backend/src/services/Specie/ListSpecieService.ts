import prismaClient from "../../prisma";

class ListSpecieService{
    async execute(){
        
        const specieList = await prismaClient.specie.findMany({
            select:{
                id: true,
                specieName: true,
                scienceAnimalId: true,
                scienceName: true
            }
        })

        return specieList;

    }
}

export { ListSpecieService }