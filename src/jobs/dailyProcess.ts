import prismaClient from "../prisma";
import { loginSigen } from "../utils/loginSigen";
import axios from "axios";

class CreateNewEventsService {
  async execute() {
    const authToken = await loginSigen("01778139540", "88040517");


    //1. PROCESSO
    //Muda todos eventos no banco para "INACTIVE"
    await prismaClient.event.updateMany({
      data: {
        eventStatus: "INACTIVE",
      },
    });

    const data = `filtroDataSaida=%222025-06-25T00%3A00%3A00%22&fitroHabilitacao=true&flTek=false&filtroEvento=true&listarExcluidas=true&listarSituacao=true&listarTodas=true&filtroForaDoEstado=N&idPessoaAutorizada=0&listarProdutor=true&id_unidade_exploracao=&cd_oficial_propriedade=&nr_unidade_exploracao=&flUep=false&ds_flag_Value=EV&ds_flag=Evento&ext-comp-1131_SelIndex=1&cs_situacao_propriedade_Value=AT&cs_situacao_propriedade=Ativa&ext-comp-1132_SelIndex=1&cb_responsavel_Value=&cb_responsavel=Documento%20(CPF%2FCNPJ)%20ou%20Nome%20e%20Munic%C3%ADpio&cb_responsavel_SelIndex=&cb_Produtor_Value=&cb_Produtor=Documento%20(CPF%2FCNPJ)%20ou%20Nome%20e%20Munic%C3%ADpio&cb_Produtor_SelIndex=&cb_Evento_Value=&cb_Evento=Nome%20ou%20Munic%C3%ADpio&cb_Evento_SelIndex=&searchUepEspecie_SelIndex=-1&cb_Localidade_Value=&cb_Localidade=Nome%20ou%20Munic%C3%ADpio&cb_Localidade_SelIndex=&cb_Municipio_Value=&cb_Municipio=Nome%20ou%20UF&cb_Municipio_SelIndex=&cb_finalidade_criacao_Value=&cb_finalidade_criacao=&searchUepFinalidade_SelIndex=-1`;

    const response = await axios.post(
      `${process.env.SIGEN_URL}/DSA.Cadastros/UnidadeExploracao/PerformSearch`,
      data,
      {
        headers: {
          Cookie: `${authToken.Salus}; ${authToken.SessionID_}; ${authToken.UserAuth}`,
        },
      }
    );

    //2. PROCESSO
    //Dificuldade: Os eventos não possuem Identificador único, precisei montar uma chave única para cada evento
    //Pega o array de eventos da resposta da API
    //Faz um map na resposta para cada objeto de evento, e procura no banco se já existe a partir da unidade de exploração
    //Se existir, muda para "ACTIVE"
    //Se não existir, cria um novo evento com chave única sendo {id_unidade_exploracao-cd_oficial-id_pessoa_produtor-id_municipio-id_finalidade_criacao-id_especie_animal-id_propriedade}

    const eventsDb = await prismaClient.event.findMany({});

    return eventsDb;
  }
}

const service = new CreateNewEventsService();
service
  .execute()
  .then(() => {
    console.log("Processo finalizado.");
  })
  .catch((err) => {
    console.error("Erro ao executar o processo:", err);
  });

export { CreateNewEventsService };
