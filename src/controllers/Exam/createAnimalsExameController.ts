import { Request, Response } from "express";
import { CreateAnimalsExameService } from "../../services/Exam/CreateAnimalsExameService";

class createAnimalsExameController{
    async handle(req:Request, res: Response): Promise<any>{

        const { animals } = req.body

        const createAnimalsExameService = new CreateAnimalsExameService();

        const created = await createAnimalsExameService.execute(animals)

        return res.json(created)

    }
}

export { createAnimalsExameController }