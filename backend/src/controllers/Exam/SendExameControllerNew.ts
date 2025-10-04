import { SendExameServiceNew } from "../../services/Exam/SendExameServiceNew";
import { Request, Response } from "express";

class SendExameControllerNew {
  async handle(req: Request, res: Response): Promise<any> {
    const Salus = req.Salus;
    const SessionID_ = req.SessionID_;
    const UserAuth = req.UserAuth;
    const veterinaryId = (req as any).user?.id;
    const { id } = req.params;

    const sendExameService = new SendExameServiceNew();

    const create = await sendExameService.execute(
      id,
      Salus,
      SessionID_,
      UserAuth,
      veterinaryId
    );

    return res.json(create);
  }
}

export { SendExameControllerNew };
