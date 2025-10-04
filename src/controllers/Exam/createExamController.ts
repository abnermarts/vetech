import { CreateExameService } from "../../services/Exam/CreateExameService";

import { Request, Response } from "express";

class createExameController {
  async handle(req: Request, res: Response): Promise<any> {
    const veterinaryId = (req as any).user?.id;
    const { filhoId, relatedId, animals } = req.body;

    const createExame = new CreateExameService();

    const create = await createExame.execute(
      veterinaryId,
      filhoId,
      relatedId,
      animals
    );

    return res.json(create);
  }
}

export { createExameController };
