import axios from "axios";

/**
 * Valida os cookies da sessão SIGEN fazendo uma requisição simples.
 * Retorna true se válido, lança erro se inválido.
 */
export async function validateSigenCookies(authCookie: {
  Salus: string;
  SessionID_: string;
  UserAuth: string;
}) {
  try {
    const cookieHeader = [
      authCookie.Salus,
      authCookie.SessionID_,
      authCookie.UserAuth,
    ].join("; ");

    const response = await axios.get(
      `${process.env.SIGEN_URL}/DSA.Tabelas/EspecieAnimal/BuscaRapidaNomeCientificoEspecie?nmCientifico=Saltat&idEspecieAnimal=93`, // ou outra rota protegida
      {
        params: {
          nmCientifico: "Saltat",
          idEspecieAnimal: 93,
        },
        headers: {
          Cookie: cookieHeader,
          referer: "https://sigen.cidasc.sc.gov.br/Account/LogOn",
        },
      }
    );

    if (!response.data.success) {
      throw new Error("Sessão SIGEN expirada. Faça login novamente.");
    }

    // Se chegou aqui, está válido
    return true;
  } catch (err) {
    throw new Error("Sessão SIGEN inválida ou expirada.");
  }
}
