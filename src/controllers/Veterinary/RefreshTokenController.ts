import { Request, Response } from "express";
import { RefreshTokenService } from "../../services/Veterinary/RefreshTokenService";

class RefreshTokenController {
  async handle(req: Request, res: Response): Promise<any> {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ error: "Refresh token não informado" });
    }

    try {
      const service = new RefreshTokenService();
      const result = await service.execute(refreshToken);
      return res.json(result);
    } catch (err: any) {
      return res.status(401).json({ error: err.message });
    }
  }
}

export { RefreshTokenController };
