import prismaClient from "../../prisma";
import { sign } from "jsonwebtoken";
import axios from "axios";

interface AuthRequest {
  user: string;
  password: string;
}

class AuthVeterinaryService {
  async execute({ user, password }: AuthRequest) {
    const veterinary = await prismaClient.veterinary.findFirst({
      where: {
        user: user,
        password: password,
      },
    });

    if (!veterinary) {
      throw new Error("Usuário ou senha incorreta");
    }

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
      Data: {
        user,
        password,
      },
    };

    if (
      authCookie.Salus == undefined ||
      authCookie.UserAuth == undefined ||
      authCookie.SessionID_ == undefined
    ) {
      throw new Error("Atualize seus dados de acesso Sigen.");
    }

    const sigenExpiresAt = Date.now() + 25 * 60 * 1000;

    const token = {
      accessToken: sign(
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
      ),
      refreshToken: sign(
        {
          name: veterinary.user,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "30d",
        }
      ),
    };

    return {
      id: veterinary.id,
      name: veterinary.nmPessoa,
      token: token,
    };
  }
}

export { AuthVeterinaryService };
