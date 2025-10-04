import { Request, Response } from "express";
import { ListCustomerSonService } from "../../services/Customer/ListCustomerSonService";

class ListCustomerSonController {
  async handle(req: Request, res: Response): Promise<any> {
    const { id_especie_animal } = req.params;
    const veterinaryId = (req as any).user?.id;
    const listCustomerSonService = new ListCustomerSonService();
    const listResult = await listCustomerSonService.execute(
      Number(id_especie_animal),
      veterinaryId
    );
    return res.json(listResult);
  }
}

export { ListCustomerSonController };
