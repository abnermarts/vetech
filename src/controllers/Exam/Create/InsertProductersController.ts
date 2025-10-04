import { Request, Response } from "express";
import { InsertProductersService } from "../../../services/Exam/Create/InsertProductersService";

class InsertProductersController {
  async handle(req: Request, res: Response): Promise<any> {

    const { listProducters } = req.body;

    const insertProductersService = new InsertProductersService();

    const created = await insertProductersService.execute(listProducters);

    return res.json(created);
  }
}

export { InsertProductersController };
