import prismaClient from "../../prisma";

class GenerateAnimalSexService {
    async execute(): Promise<any>{

        const createSex = await prismaClient.sexo.createMany({
            data:[
                {
                    id: '1',
                    csFlag: 'MA',
                    dsFlag: 'Macho'
                },
                {
                    id: '2',
                    csFlag: 'FE',
                    dsFlag: 'Fêmea'
                },
            ]
        })

        return createSex;

    }
}

export { GenerateAnimalSexService };