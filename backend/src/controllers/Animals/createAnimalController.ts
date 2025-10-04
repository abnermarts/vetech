import { CreateAnimalService } from "../../services/Animals/CreateAnimalService";

import { Request, Response } from "express";

class createAnimalController{
    async handle(req: Request, res: Response): Promise<any>{

        const {dsDataNascimento, dsPelagem, sexoId, specieId, customerId, diamAnilha } = req.body;

        const token = req.headers

        const createAnimalService = new CreateAnimalService();

        const createDb = await createAnimalService.execute({
            dsDataNascimento,
            dsPelagem,
            sexoId,
            specieId,
            customerId,
            diamAnilha
        });

        return res.json(createDb)

    }
}

export { createAnimalController }