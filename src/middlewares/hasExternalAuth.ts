import { Request, Response, NextFunction } from "express";
import { validateSigenCookies } from "../utils/validateSigenCookies";

export async function hasExternalAuth(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const user = (req as any).user;

  if (
    !user?.Salus ||
    !user?.SessionID_ ||
    !user?.UserAuth ||
    !user?.sigenExpiresAt ||
    Date.now() > user.sigenExpiresAt
  ) {
    res.status(401).json({ error: "Token externo expirado ou ausente" });
  }

  try {
    await validateSigenCookies({
      Salus: user.Salus,
      SessionID_: user.SessionID_,
      UserAuth: user.UserAuth,
    });
    next();
  } catch (err) {
    res
      .status(401)
      .json({ error: "Sessão SIGEN expirada. Faça login novamente." });
  }
}
