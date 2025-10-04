import { Response } from "express";
import { GenerateAnimalSexService } from "../../services/Animals/GenerateAnimalSexService";

class GenerateAnimalSexController{
    async handle(res: Response): Promise<any>{

        const generateAnimalSexService = new GenerateAnimalSexService();

        const generateResult = await generateAnimalSexService.execute();

        return res.json(generateResult)

    }
}

export { GenerateAnimalSexController }