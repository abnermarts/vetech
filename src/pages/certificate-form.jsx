import UserSelect from "@/components/UserSelect";
import BirdSelect from "@/components/BirdSelect";
import SucessCertificate from "@/components/view-exames/SucessCertificate";
import StepsHeader from "@/components/StepsHeader";
import ButtonDashboard from "@/components/ButtonDashboard";
import { CertificateContext } from "@/context/CertificateContext";
import { SelectAnimalsContext } from "@/context/SelectAnimalsContext";
import { downloadExcel } from "react-export-table-to-excel";
import { Table2 } from "lucide-react";
import SelectAnimal from "@/components/select-animal/SelectAnimal";
import { Loader } from "lucide-react";

//Hooks
import { useCertificate } from "@/hooks/useCertificate";
import { useState, useRef, useCallback, useEffect } from "react";
import { useParams } from "react-router";
import { api } from "@/services/api";

const CertificatePage = () => {
  const getSonDataRef = useRef(null);
  const getAnimalDataRef = useRef(null);
  const [disabled, setDisabled] = useState([]);
  const [loading, setLoading] = useState(false);

  const animalSelecteds = useRef([]);
  useEffect(() => {
    setDisabled(animalSelecteds.current);
  }, [animalSelecteds]);

  const { id } = useParams();
  const [exameId, setExameId] = useState(null);
  const [animal, setAnimal] = useState(null);
  const [sending, setSending] = useState(false);
  const dataRenderRef = useRef([]);

  const certificateComponents = [
    <UserSelect idCertificate={id} />,
    <SelectAnimal idCertificate={id} />,
    <SucessCertificate idCertificate={id} />,
  ];

  const { currentStep, currentComponent, changeStep } = useCertificate(
    certificateComponents
  );

  async function handleCreateExam(e) {
    try {
      setLoading(true);
      await Promise.all(
        animalSelecteds.current.map(async (item) => {
          return await api.post("/exameCreate", {
            relatedId: id,
            filhoId: item.filhoId,
            animals: item.animals.map((animal) => {
              return {
                animal_id: animal.animal_id,
              };
            }),
          });
        })
      );
    } catch (error) {
      console.log(error);
    } finally {
      changeStep(currentStep + 1, e);
    }
  }

  async function handleInsertCustomer(e) {
    try {
      setLoading(true);
      await api.post("/createExameId", {
        identificatorsId: id.toString(),
      });
    } catch (error) {
      console.log("Erro ao obter dados do filho:", error);
    } finally {
      await api.post("/insertProducters", {
        listProducters: getSonDataRef.current().map((item) => {
          return {
            identificatorsId: id,
            producterId: item.id,
          };
        }),
      });
      setLoading(false);
      changeStep(currentStep + 1, e);
    }
  }

  async function handleCreateCertificate() {
    setSending(true);
    for (const animalArr of animal) {
      const response = await api.post("/sendExam", {
        id: [animalArr[0].exame_id],
      });
      dataRenderRef.current = [...dataRenderRef.current, response.data];
    }
    setSending(false);
  }

  // function handleLogCustomer() {
  //   console.log(
  //     dataRenderRef.current.map((item) => ({
  //       idExameDoenca: item[0]?.dados?.data?.idExameDoenca || "N/A",
  //       response:
  //         item[0]?.dados?.data?.unidadeExploracao?.nmUnidadeExploracao || "N/A",
  //       data: item[0] || "N/A",
  //     }))
  //   );
  // }

  const dataDowloadXLS = dataRenderRef.current.map((item) => ({
    idExameDoenca: item[0]?.dados?.data?.idExameDoenca || "N/A",
    response:
      item[0]?.dados?.data?.unidadeExploracao?.nmUnidadeExploracao || "N/A",
  }));

  const header = ["Identificador Exame", "Nome Unidade de Exploração"];

  function handleDownloadExcel() {
    downloadExcel({
      fileName: "react-export-table-to-excel -> downloadExcel method",
      sheet: "react-export-table-to-excel",
      tablePayload: {
        header,
        body: dataDowloadXLS,
      },
    });
  }

  return (
    <SelectAnimalsContext.Provider value={animalSelecteds}>
      <CertificateContext.Provider
        value={{
          registerGetDataFn: (fn) => (getSonDataRef.current = fn),
          registerGetAnimal: getAnimalDataRef.current,
        }}
      >
        <div className="flex flex-col h-full max-h-full min-h-screen w-full">
          <StepsHeader currentStep={currentStep} />
          {currentComponent}
          <div className="flex flex-row gap-2 w-full py-4 items-center justify-center content-center bg-white">
            {currentStep === 0 && (
              <ButtonDashboard
                variant="secondary"
                onClick={handleInsertCustomer}
                disabled={loading}
              >
                Selecionar produtores
                {loading && <Loader className="w-4 h-4 animate-spin" />}
              </ButtonDashboard>
            )}
            {currentStep === 1 && (
              <>
                <ButtonDashboard
                  variant="secondary"
                  onClick={handleCreateExam}
                  disabled={loading}
                >
                  Gerar atestado de Saúde
                  {loading && <Loader className="w-4 h-4 animate-spin" />}
                </ButtonDashboard>
              </>
            )}
            {currentStep === 2 && (
              <div className="flex flex-row gap-3">
                {dataRenderRef.current.length > 0 ? (
                  <ButtonDashboard
                    onClick={handleDownloadExcel}
                    variant="three"
                  >
                    <Table2 width={15} />
                    Baixar CSV
                  </ButtonDashboard>
                ) : (
                  ""
                )}
              </div>
            )}
          </div>
        </div>
      </CertificateContext.Provider>
    </SelectAnimalsContext.Provider>
  );
};

export default CertificatePage;
