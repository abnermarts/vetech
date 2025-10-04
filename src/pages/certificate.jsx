import { useParams } from "react-router";
import Steps from "@/components/Steps";
import { ComboboxDemo } from "@/components/ComboBox";
import DemoPage from "@/components/Table";
import ButtonDashboard from "@/components/ButtonDashboard";

const Certificate = () => {
  const { id } = useParams();

  return (
    <div className="flex flex-col justify-center items-center w-full h-dvh">
      <div className="flex flex-col w-full">
        <div className="bg-[#F3F3F3] flex flex-row w-full justify-center items-center gap-5 py-3">
          <Steps status="active" />
          <span className="bg-[#D8D8D8] pt-[1px] pl-6" />
          <Steps step="2" name="Animais" status="inactive" />
          <span className="bg-[#D8D8D8] pt-[1px] pl-6" />
          <Steps step="3" name="Revisão" status="inactive" />
        </div>
      </div>
      <div className="w-full h-dvh flex flex-col justify-center items-center gap-4">
        <h1>#{id}</h1>
        <h2 className="font-medium text-lg">
          Selecione os produtores que será gerado o atestado de saúde.
        </h2>
        <p className="w-[500px] text-center text-[14px] text-[#787878]">
          Para selecionar, clique no checkbox relacionado <br /> do cliente e
          após isso em "avançar".
        </p>
        <div className="flex flex-col w-[50%] justify-center content-center items-center">
          <DemoPage />
          <ButtonDashboard variant="secondary">Avançar</ButtonDashboard>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
