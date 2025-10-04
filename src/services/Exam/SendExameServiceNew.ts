import prismaClient from "../../prisma";
import axios from "axios";
import moment = require("moment-timezone");

class SendExameServiceNew {
  async execute(id, Salus, SessionID_, UserAuth, veterinaryId) {
    const results = [];
    const todayDate = moment.tz("America/Sao_Paulo").format("YYYY-MM-DD");
    const randomId = Math.floor(Math.random() * 2000000000);

    const veterinaryData = await prismaClient.veterinary.findUnique({
      where: {
        id: veterinaryId,
      },
    });

    const dataQuery = await prismaClient.exame.findMany({
      where: {
        relatedId: id,
      },
      select: {
        id: true,
        filho: {
          select: {
            id: true,
            id_especie_animal: true,
            id_unidade_exploracao: true,
            Customer: {
              select: {
                customerName: true,
              },
            },
          },
        },
        exameAnimals: {
          select: {
            animals: {
              select: {
                id: true,
                diamAnilha: true,
                dsDataNascimento: true,
                dsPelagem: true,
                dsIdentificacaoAnimal: true,
                sexo: {
                  select: {
                    id: true,
                    csFlag: true,
                    dsFlag: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    console.log("Entrou no envio")

    const payload = dataQuery.map((item) => {
      return {
        idExame: item.id,
        filhoId: item.filho.id,
        exameDoenca: {
          idExameDoenca: "",
          tipoAtuacao: {
            idTipoAtuacao: "",
            nmTipoAtuacao: "",
          },
          cdExamePNCEBT: "",
          dtInicioRegistro: todayDate,
          dtValidadeExame: "",
          dtExame: todayDate,
          tipoExame: {
            csFlag: "AT",
          },
          especieAnimal: {
            idEspecieAnimal: item.filho.id_especie_animal,
          },
          doencaAnimal: {
            idDoencaAnimal: "132",
            nmDoencaAnimal: "Atestado Sanitário Silvestres",
          },
          propriedade: {
            idPropriedade: "",
            cdOficialFormatado: "",
            cdOficial: "",
            pessoaTitular: {
              nrDocumento: "",
              nmPessoa: item.filho.Customer.customerName,
            },
            localidade: {
              nmLocalidade: "",
              municipio: {
                idMunicipio: "",
                nmMunicipio: "",
                uf: {
                  sgUF: "",
                },
              },
              uf: {
                sgUF: "",
              },
            },
          },
          veterinario: {
            idVeterinario: veterinaryData.idVeterinario,
            nrCrmvVeterinario: veterinaryData.nrCrmvVeterinario,
            pessoaVeterinario: {
              idPessoa: veterinaryData.idPessoa,
              nmPessoa: veterinaryData.nmPessoa,
              dsEmail: "",
              nrFone: "",
              nrFone2: "",
            },
            uf: {
              sgUF: "SC",
            },
            nrMatriculaColaborador: "",
            municipioLotacao: "",
          },
          unidadeExploracao: {
            idUnidadeExploracao: item.filho.id_unidade_exploracao,
          },
          listaExameDoencaIdentificacaoAnimal: {
            Created: item.exameAnimals.map((animal) => {
              return {
                id: animal.animals.id,
                dsDataNascimento: moment(
                  animal.animals.dsDataNascimento
                ).format("DD/MM/YYYY"),
                dsPelagem: animal.animals.dsPelagem,
                dsIdentificacaoAnimal: animal.animals.diamAnilha,
                dsLocalizacaoIdentificacaoAnimal:
                  animal.animals.dsIdentificacaoAnimal,
                tipoSexo: {
                  csFlag: animal.animals.sexo.csFlag,
                  dsFlag: animal.animals.sexo.dsFlag,
                },
                sort: animal.animals.sexo.csFlag,
              };
            }),
          },
          nomeCientifico: {
            nmCientifico: "sicalis flaveola",
            idEspecieNomeCientifico: 0,
          },
          listaArquivo: "",
          listaDadosItens: "",
          dtFabricacaoVacina: "",
        },
      };
    });

    await Promise.all(
      payload.map(async (item) => {
        try {
          const response = await axios.post(
            `${process.env.SIGEN_URL}/DSA.Processos/ExameDoenca/Add`,
            item.exameDoenca,
            {
              headers: {
                Cookie: `${Salus}; ${SessionID_}; ${UserAuth}; csTipoUsuario=MH`,
              },
              withCredentials: true,
            }
          );

          results.push({
            status: response.data.success ? "Sucesso" : "Erro",
            payload: item.exameDoenca,
            response: response.data,
          });

          if (response.data.success) {
            await prismaClient.exame.updateMany({
              where: {
                id: item.idExame,
                relatedId: id,
                filhoId: item.filhoId,
                SendExame: false,
              },
              data: {
                idExameDoenca: response.data.data.idExameDoenca,
                SendExame: response.data.success,
              },
            });
          } else {
            await prismaClient.exame.updateMany({
              where: {
                id: item.idExame,
                relatedId: id,
                filhoId: item.filhoId,
                SendExame: false,
              },
              data: {
                idExameDoenca: randomId,
                SendExame: response.data.success,
              },
            });

            console.log("Passou")

            await prismaClient.erroTableExame.createMany({
              data: response.data.message.error.map((msg) => ({
                exame_id: item.idExame,
                text: msg,
              })),
            });
          }
        } catch (error) {
          results.push({
            status: "Erro",
            payload: item.exameDoenca,
            response: error,
          });
        }
      })
    );

    return results;
  }
}

export { SendExameServiceNew };
