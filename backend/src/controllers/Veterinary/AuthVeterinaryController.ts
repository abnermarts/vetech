import { Request, Response } from "express";
import { AuthVeterinaryService } from "../../services/Veterinary/AuthVeterinaryService";

class AuthVeterinaryController{
    async handle(req: Request, res: Response): Promise<any>{
        const { user, password } = req.body;

        const authVeterinaryService = new AuthVeterinaryService();

        const auth = await authVeterinaryService.execute({
            user,
            password
        })

        return res.json(auth)
    }
}

export { AuthVeterinaryController }