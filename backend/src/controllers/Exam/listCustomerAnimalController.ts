import { ListCustomerAnimalsService } from "../../services/Exam/ListCustomerAnimalsService";

import { Request, Response } from "express";

class listCustomerAnimalController{
    async handle(req: Request, res: Response): Promise<any>{

        const { ids } = req.body;

        const listcustomeranimalservice = new ListCustomerAnimalsService();

        const result = await listcustomeranimalservice.execute(ids)

        return res.json(result);

    }
}

export { listCustomerAnimalController }