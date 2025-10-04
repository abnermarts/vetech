import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface Payload {
  sub: string;
  Salus: string;
  SessionID_: string;
  UserAuth: string;
}

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authToken = req.headers.authorization;

  if (!authToken) {
    res.status(401).end();
  }

  const [, token] = authToken.split(" ");

  try {
    const data = verify(
      token,
      process.env.JWT_SECRET
    ) as Payload;

    req.Salus = data.Salus;
    req.SessionID_ = data.SessionID_;
    req.UserAuth = data.UserAuth;
    (req as any).user = data;

    return next();
  } catch (err) {
    res.status(401).end();
  }
}
