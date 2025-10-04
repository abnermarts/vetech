import prismaClient from "../../prisma";
import axios from "axios";

interface Customer {
  cpf: string;
  idUnidadeExploracao?: number;
  customerName?: string;
  animals?: string;
  idCustomerFather?: string;
  nm_especie_animal?: string;
  Salus: string;
  SessionID_: string;
  UserAuth: string;
  UserToken?: string;
  veterinaryId: string;
}

class CreateCustomerService {
  async execute({ cpf, Salus, SessionID_, UserAuth, veterinaryId }: Customer) {
    const customerExist = await prismaClient.customer.findFirst({
      where: {
        cpf: cpf,
        relatedVeterinary: veterinaryId,
      },
    });

    if (customerExist) {
      throw new Error("Produtor já cadastrado");
    }

    const getCustomerData = await axios.post(
      `${process.env.SIGEN_URL}/DSA.Cadastros/UnidadeExploracao/QuickSearch`,
      {
        listarTodas: true,
        query: cpf,
      },
      {
        headers: {
          Cookie: `${Salus}; ${SessionID_}; ${UserAuth}`,
        },
        withCredentials: true,
      }
    );

    if (getCustomerData.data.data.length === 0) {
      throw new Error("Produtor não encontrado");
    }

    const createCustomer = await prismaClient.customer.create({
      data: {
        cpf: cpf,
        Municipio: getCustomerData.data.data[0].nm_municipio,
        Rua: getCustomerData.data.data[0].nm_logradouro,
        Numero: getCustomerData.data.data[0].ds_numero_logradouro,
        idUnidadeExploracao: getCustomerData.data.data[0].id_unidade_exploracao,
        customerName: getCustomerData.data.data[0].nm_produtor,
        relatedVeterinary: veterinaryId,
      },
    });

    const customerFatherId = String(createCustomer.id);

    let customerDataArray: any[] = getCustomerData.data.data;

    const customerArray = customerDataArray.map((data) => {
      return {
        idCustomerFather: customerFatherId,
        cdOficialFormatado: data.cd_oficial_formatado,
        id_especie_animal: data.id_especie_animal,
        nm_especie_animal: data.nm_especie_animal,
        id_unidade_exploracao: data.id_unidade_exploracao,
        idMunicipio: data.id_municipio,
        idPessoa: data.id_pessoa,
        idPropriedade: data.id_propriedade,
        idUF: data.id_uf,
        nmLocalidade: data.nm_localidade,
        uf: data.sg_uf,
      };
    });

    await prismaClient.filho.createMany({
      data: customerArray,
    });

    return getCustomerData.data.data[0];
  }
}

export { CreateCustomerService };
