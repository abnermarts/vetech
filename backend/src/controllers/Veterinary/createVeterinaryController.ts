import { Request, Response } from "express";
import { CreateVeterinaryService } from "../../services/Veterinary/CreateVeterinaryService";

class createVeterinaryController {
    async handle(req: Request, res: Response): Promise<any>{
        const { user, password, userSigen, passwordSigen } = req.body

        const createVeterinaryService = new CreateVeterinaryService();

        const create = await createVeterinaryService.execute({
            user,
            password,
            userSigen,
            passwordSigen
        })

        return res.json(create)
    }
}

export { createVeterinaryController };