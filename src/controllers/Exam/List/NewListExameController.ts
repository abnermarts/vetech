import { Request, Response } from "express";
import { NewListExameService } from "../../../services/Exam/List/NewListExameService";

class NewListExameController {
  async handle(req: Request, res: Response): Promise<any> {
    const id = req.query.id as string;
    const veterinaryId = (req as any).user?.id;

    const listProducterService = new NewListExameService();

    const result = await listProducterService.execute(veterinaryId, id);

    return res.json(result);
  }
}

export { NewListExameController };
