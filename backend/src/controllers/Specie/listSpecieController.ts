import { Request, Response } from "express";
import { ListSpecieService } from "../../services/Specie/ListSpecieService";

class ListSpecieController {
    async handle(req: Request, res: Response): Promise<any>{

        const listSpecieService = new ListSpecieService();

        const listSpecie = await listSpecieService.execute();

        return res.json(listSpecie);

    }
}

export { ListSpecieController }