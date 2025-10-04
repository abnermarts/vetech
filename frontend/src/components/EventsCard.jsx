import ListCertificate from "@/components/ListCertificate";
import ButtonDashboard from "./ButtonDashboard";
import ListGenerateGTA from "./ListGenerateGTA";
import { useContext, useEffect } from "react";
import { EventDetailContext } from "@/context/EventDetailContext";


export default function EventsCards() {

  const { dataDetail } = useContext(EventDetailContext);
  console.log("EventsCard" + JSON.stringify(dataDetail));

  return (
    <div className="flex flex-col w-full h-full gap-2 rounded-lg bg-[#ffffff6c] border border-solid border-[#eeeeee]">
      <div className="flex flex-col w-full h-fit p-12 gap-2 border-b border-solid border-[#eeeeee]">
        <div className="flex flex-row h-auto gap-3 items-center align-center font-normal text-[#9b9b9b] text-[12px] capitalize">
          <span>{dataDetail.nm_especie_animal.toLowerCase()}</span>•<span>{dataDetail.nm_municipio.toLowerCase()}</span>•<span>{dataDetail.sg_uf}</span>
        </div>
        <h1 className="font-semibold text-[32px] capitalize">
          {dataDetail.nm_proprietario.toLowerCase()}
        </h1>
        <div className="flex flex-row gap-6">
          <span>
            <p className="text-[12px]">Produtor responsável</p>
            <p className="text-[14px] font-medium capitalize">{dataDetail.nm_produtor.toLowerCase()}</p>
          </span>
          <span>
            <p className="text-[12px]">Endereço</p>
            <p className="text-[14px] font-medium capitalize">
              {dataDetail.nm_logradouro.toLowerCase()} - {dataDetail.ds_complemento_logradouro.toLowerCase()}
            </p>
          </span>
        </div>
      </div>
      <div className="flex flex-col w-full px-12">
        <div className="flex flex-row w-full gap-4 items-center justify-between">
          <div className="flex gap-4">
            <span>Pendentes</span>
            <span>Finalizados</span>
          </div>
          <ButtonDashboard variant="secondary">Vincular ao Evento</ButtonDashboard>
        </div>
        {/* <ListCertificate /> */}
      </div>
    </div>
  );
}
