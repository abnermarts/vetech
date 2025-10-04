import prismaClient from "../../prisma";
import axios from "axios";

interface Veterinary {
  user: string;
  password: string;
  userSigen: string;
  passwordSigen: string;
}

class CreateVeterinaryService {
  async execute({ user, password, userSigen, passwordSigen }: Veterinary) {
    const userData = await prismaClient.veterinary.findFirst({
      where: {
        user: user,
      },
    });

    if (userData) {
      throw new Error("Usuário já existe, faça o login.");
    }

    console.log(user, password, userSigen, passwordSigen);

    const response = await axios.post(
      `${process.env.SIGEN_URL}/Account/Login`,
      {
        nmUsuario: userSigen,
        dsSenha: passwordSigen,
      },
      {
        headers: {
          referer: "https://sigen.cidasc.sc.gov.br/Account/LogOn",
        },
      }
    );

    console.log(response.data)

    if (response.data.ErrorMessage) {
      throw new Error("Usuário ou senha no Sigen/CIDASC incorreto.");
    }

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
      throw new Error("Usuário ou senha no Sigen/CIDASC incorreto.");
    }

    const getPessoaId = await axios.post(
      `${process.env.SIGEN_URL}/ERelacionamento.ERelacionamento/SolicitacaoAtendimento/CarregarNotificacaoMensagemERelacionamento`,
      {},
      {
        headers: {
          Cookie: `${authCookie.Salus}; ${authCookie.SessionID_}; ${authCookie.UserAuth}`,
        },
        withCredentials: true,
      }
    );

    const pessoaId = getPessoaId.data.data.usuario.pessoaUsuario.idPessoa;

    const veterinaryData = await axios.get(
      `${process.env.SIGEN_URL}/DSA.Cadastros/Veterinario/GetVeterinarioPorIdPessoa?id=${pessoaId}`,
      {
        headers: {
          Cookie: `${authCookie.Salus}; ${authCookie.SessionID_}; ${authCookie.UserAuth}`,
        },
      }
    );

    console.log(veterinaryData.data)

    const createUser = await prismaClient.veterinary.create({
      data: {
        email: getPessoaId.data.data.usuario.dsEmail,
        user: user,
        password: password,
        userSigen: userSigen,
        passwordSigen: passwordSigen,
        UF: veterinaryData.data.data.uf.sgUF,
        csTipoAtuacao: veterinaryData.data.data.csTipoAtuacao,
        idVeterinario: veterinaryData.data.data.idVeterinario,
        nrCrmvVeterinario: veterinaryData.data.data.nrCrmvVeterinario,
        nrDocumento: veterinaryData.data.data.pessoaVeterinario.nrDocumento,
        idPessoa: veterinaryData.data.data.pessoaVeterinario.idPessoa,
        nmPessoa: veterinaryData.data.data.pessoaVeterinario.nmPessoa,
      },
      select: {
        user: true,
        email: true,
        id: true,
      },
    });

    return createUser;
  }
}

export { CreateVeterinaryService };
