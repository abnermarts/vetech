import axios from "axios";

export async function loginSigen(user: string, password: string) {
  const url = process.env.SIGEN_URL;

  if (!url) {
    throw new Error("SIGEN_URL is not defined in environment variables");
  }

  const response = await axios.post(
    `${url}/Account/Login`,
    {
      nmUsuario: user,
      dsSenha: password,
    },
    {
      headers: {
        referer: `${url}/Account/LogOn`,
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
    authCookie.Salus === undefined ||
    authCookie.UserAuth === undefined ||
    authCookie.SessionID_ === undefined
  ) {
    throw new Error("Usuário inválido");
  }

  return authCookie;
}