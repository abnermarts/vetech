import { Request, Response } from "express";
import { ListProductersService } from "../../../services/Exam/List/ListProductersService";

class ListProductersController {
  async handle(req: Request, res: Response): Promise<any> {
    const id = req.params.id;

    const listProducterService = new ListProductersService();

    const result = await listProducterService.execute(id);

    return res.json(result);
  }
}

export { ListProductersController };
