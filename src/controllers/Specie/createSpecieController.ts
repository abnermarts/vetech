import { Request, Response } from "express";
import prismaClient from "../../prisma";
import { CreateSpecieService } from "../../services/Specie/CreateSpecieService";

class createSpecieController{
    async handle(req: Request, res:Response): Promise<any>{

        const { specieAnimalId, specieName, scienceAnimalId, scienceName } = req.body;

        const createSpecieService = new CreateSpecieService();

        const specieExist = await prismaClient.specie.findFirst({
            where:{
                id: specieAnimalId,
            }
        })

        if(specieExist){
            return res.json({ Erro: 'Especie já cadastrada' })
        }

        const specieInterface = {
            specieAnimalId: specieAnimalId,
            specieName: specieName,
            scienceAnimalId: scienceAnimalId,
            scienceName: scienceName
        }

        createSpecieService.execute(specieInterface)

        return res.json({ Sucesso: 'Specie cadastrada com sucesso'})

    }
}

export { createSpecieController }