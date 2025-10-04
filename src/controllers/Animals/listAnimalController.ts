import { Request, Response } from "express";
import { ListAnimalService } from "../../services/Animals/ListAnimalService";

class listAnimalController {
  async handle(req: Request, res: Response): Promise<any> {
    const sub = (req as any).sub;

    const listAnimalService = new ListAnimalService();

    const listAnimal = await listAnimalService.execute(sub);

    return res.json(listAnimal);
  }
}

export { listAnimalController };
