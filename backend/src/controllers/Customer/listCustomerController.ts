import { Request, Response } from "express";
import { ListCustomerService } from "../../services/Customer/ListCustomersService";

class listCustomerController {
  async handle(req: Request, res: Response): Promise<any> {
    const veterinaryId = (req as any).user?.id;

    const listCustomerService = new ListCustomerService();

    const listCustomer = await listCustomerService.execute(veterinaryId);

    return res.json(listCustomer);
  }
}

export { listCustomerController };
