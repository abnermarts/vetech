import prismaClient from "../../prisma";
import { verify, sign } from "jsonwebtoken";
import axios from "axios";

class RefreshTokenService {
  async execute(refreshToken: string) {
    let payload: any;
    try {
      payload = verify(refreshToken, process.env.JWT_SECRET!);
    } catch {
      throw new Error("Refresh token inválido");
    }

    

    const veterinary = await prismaClient.veterinary.findFirst({
      where: { user: payload.name },
    });
    if (!veterinary) throw new Error("Usuário não encontrado");

    

    const response = await axios.post(
      `${process.env.SIGEN_URL}/Account/Login`,
      {
        nmUsuario: veterinary.userSigen,
        dsSenha: veterinary.passwordSigen,
      },
      {
        headers: {
          referer: "https://sigen.cidasc.sc.gov.br/Account/LogOn",
        },
      }
    );

    const extract = response.headers;
    const extractAuth = extract["set-cookie"] as any;

    const authCookie = {
      Salus: extractAuth[2],
      SessionID_: extractAuth[0],
      UserAuth: extractAuth[1],
    };

    if (
      authCookie.Salus == undefined ||
      authCookie.UserAuth == undefined ||
      authCookie.SessionID_ == undefined
    ) {
      throw new Error("Falha ao renovar credenciais da integração");
    }

    const sigenExpiresAt = Date.now() + 25 * 60 * 1000;

    const accessToken = sign(
      {
        id: veterinary.id,
        name: veterinary.user,
        Salus: authCookie.Salus,
        SessionID_: authCookie.SessionID_,
        UserAuth: authCookie.UserAuth,
        sigenExpiresAt,
      },
      process.env.JWT_SECRET,
      {
        subject: veterinary.id,
        expiresIn: "7d",
      }
    );

    return { accessToken };
  }
}

export { RefreshTokenService };
