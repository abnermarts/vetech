import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState, useEffect } from "react";
import { CircleCheck, OctagonAlert } from "lucide-react";
import { api } from "@/services/api";

import { DrawerAnimalsSelect } from "./DrawerAnimalsSelect";

const BirdSelect = ({ idCertificate, exameIdMap, handleInsertAnimal }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const customerAnimals = async () => {
      setIsLoading(true);
      try {
        const response = await api.get(`/listAnimalCs/${idCertificate}`);
        const resultado = await exameIdMap.map((item1) => {
          const match = response.data.find(
            (item2) => item2.customerId === item1.customerId
          );
          return {
            ...item1,
            ...(match ? { customer: match.customer } : {}),
          };
        });
        setData(resultado);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    customerAnimals();
  }, [idCertificate, exameIdMap]);

  const [selectedAnimalsByCustomer, setSelectedAnimalsByCustomer] = useState(
    {}
  );

  const [dataToSend, setDataToSend] = useState({});

  useEffect(() => {
    handleInsertAnimal(Object.values(dataToSend));
  }, [dataToSend, handleInsertAnimal]);

  function handleDataFromChild(customerId, selectedAnimals) {
    setSelectedAnimalsByCustomer((prev) => ({
      ...prev,
      [customerId]: selectedAnimals.map((a) => a.animal_id || a.id),
    }));
    setDataToSend((prev) => ({
      ...prev,
      [customerId]: selectedAnimals,
    }));
  }
  return (
    <div className="flex flex-col justify-start items-center w-full h-full bg-white flex-1">
      <div className="w-full flex flex-col justify-start items-center gap-4">
        <div className="flex flex-col justify-center items-center gap-0 pt-4">
          <p className="text-sm">#{idCertificate}</p>
          <h2 className="font-medium text-lg">
            Selecione os animais de cada cliente.
          </h2>
          <p className="w-[500px] text-center text-[14px] text-[#787878]">
            Para selecionar, clique no nome do cliente <br /> depois selecione
            os animais e salvar.
          </p>
        </div>
        <div className="flex flex-row w-[50%] justify-center content-center items-center">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>CPF</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                      </TableCell>
                      <TableCell>
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
                      </TableCell>
                      <TableCell>
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3" />
                      </TableCell>
                    </TableRow>
                  ))
                : data.map((item) => (
                    <DrawerAnimalsSelect
                      key={item.customerId}
                      className="font-medium"
                      data={
                        item.customer?.customerFilho?.flatMap(
                          (filho) =>
                            filho.animals?.map((animal) => ({
                              id: animal.id,
                              animalName: animal.animalName,
                              diamAnilha: animal.diamAnilha,
                              dsDataNascimento: animal.dsDataNascimento,
                            })) || []
                        ) || []
                      }
                      exameId={item.exameId}
                      dataToSend={(selected) =>
                        handleDataFromChild(item.customerId, selected)
                      }
                      selectedAnimalsByCustomer={selectedAnimalsByCustomer}
                      customerId={item.customerId}
                    >
                      <TableRow
                        key={item.id}
                        className="cursor-pointer"
                        style={{ cursor: "pointer" }}
                        tabIndex={0}
                        role="button"
                      >
                        <TableCell className="font-medium capitalize">
                          {item.customer?.customerName.toLowerCase() || "-"}
                        </TableCell>
                        <TableCell>{item.customer?.cpf || "-"}</TableCell>
                        <TableCell className="flex flex-row justify-end">
                          {(selectedAnimalsByCustomer[item.customerId]
                            ?.length ?? 0) > 0 ? (
                            <CircleCheck
                              color="#FFFFFF"
                              size={22}
                              className="bg-[#2aa30f] p-0.5 rounded-4xl"
                            />
                          ) : (
                            <OctagonAlert
                              color="#FFFFFF"
                              size={22}
                              className="bg-[#dab379] p-0.5 rounded-4xl"
                            />
                          )}
                        </TableCell>
                      </TableRow>
                    </DrawerAnimalsSelect>
                  ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default BirdSelect;
