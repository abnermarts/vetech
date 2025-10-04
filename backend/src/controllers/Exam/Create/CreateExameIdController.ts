import { Request, Response } from "express";
import { CreateExameIdService } from "../../../services/Exam/Create/CreateExameIdService";

class CreateExameIdController {
  async handle(req: Request, res: Response): Promise<any> {

    const { identificatorsId } = req.body;

    const createExameIdService = new CreateExameIdService();

    const created = await createExameIdService.execute(identificatorsId);

    return res.json(created);
  }
}

export { CreateExameIdController };
