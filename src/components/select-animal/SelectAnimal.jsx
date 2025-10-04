import { TableCustomer } from "./TableCustomer";
import { listCustomerAnimal } from "../Columns";
import { useEffect, useState } from "react";
import { api } from "@/services/api";

export default function SelectAnimal({ idCertificate }) {
  const [customerData, setCustomerData] = useState([]);
  const [payload, setPayload] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const animalList = async () => {
      try {
        const response = await api.get(`/listProducters/${idCertificate}`);
        setCustomerData(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    animalList();
  }, [idCertificate]);

  // Passe setPayload para TableCustomer para atualizar o payload conforme seleção
  return (
    <div className="flex flex-col justify-start items-center w-full h-lvh flex-1">
      <div className="w-full h-full flex flex-col justify-center items-center gap-4 pt-4">
        <p className="text-sm">#{idCertificate}</p>
        <h2 className="font-medium text-lg">
          Selecione os animais de cada produtor.
        </h2>
        <p className="w-[500px] text-center text-[14px] text-[#787878]">
          Clique no produtor, selecione os animais <br /> e clique em "Selecionar e Salvar".
        </p>
        <div className="flex flex-col w-[50%] justify-center content-center items-center">
          <TableCustomer
            columns={listCustomerAnimal}
            data={customerData}
            columnsName="customerName"
            isLoading={isLoading}
            payload={payload}
            setPayload={setPayload}
          />
        </div>
      </div>
    </div>
  );
}
