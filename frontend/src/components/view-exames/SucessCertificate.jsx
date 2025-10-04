import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { TableLisExam } from "./TableListExam";
import { listExames } from "../Columns";

const SucessCertificate = ({ idCertificate }) => {
  const [loading, setLoading] = useState(true);
  const [examData, setExamData] = useState([]);

  useEffect(() => {
    const examList = async () => {
      try {
        await api.post(`/sendExame/${idCertificate}`);
      } catch (error) {
        console.log(error);
      } finally {
        const response = await api.get("/listExame", {
          params: {
            id: idCertificate,
          },
        });
        setExamData(response.data);
        setLoading(false);
      }
    };
    examList();
  }, [idCertificate]);

  return (
    <div className="w-full h-full flex flex-col justify-start items-center gap-4 flex-1">
      <div className="w-full h-full flex flex-col justify-start items-center gap-4">
        <div className="flex flex-col justify-center items-center gap-0 pt-4">
          <p className="text-sm">#{idCertificate}</p>
          <h2 className="font-medium text-lg">Emitir atestado</h2>
          <p className="w-[500px] text-center text-[14px] text-[#787878]">
            Veja detalhes clicando na linha do atestado de saúde.
          </p>
        </div>
        <div className="flex flex-col w-[60%] justify-center content-center items-center">
          <TableLisExam
            data={examData}
            columns={listExames}
            columnsName="customerName"
            isLoading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default SucessCertificate;
