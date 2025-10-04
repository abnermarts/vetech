import { Request, Response } from "express";
import { CreateCustomerService } from "../../services/Customer/CreateCustomerService";

class createCustomerController {
  async handle(req: Request, res: Response): Promise<any> {
    const { cpf } = req.body;
    const Salus = req.Salus;
    const SessionID_ = req.SessionID_;
    const UserAuth = req.UserAuth;
    const veterinaryId = (req as any).user?.id;

    const createCustomerService = new CreateCustomerService();

    const create = await createCustomerService.execute({
      cpf,
      Salus,
      SessionID_,
      UserAuth,
      veterinaryId,
    });

    return res.json(create);
  }
}

export { createCustomerController };
