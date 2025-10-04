import { useRef, useCallback, useEffect, useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { columnsAnimal } from "./Columns";
import { DataTable } from "./Data-Table";
import { Button } from "./ui/button";

export const DrawerAnimalsSelect = ({
  children,
  data,
  exameId,
  dataToSend,
  selectedAnimalsByCustomer,
  customerId,
}) => {
  const selectedRowsRef = useRef([]);
  const selectedIds = useMemo(
    () => selectedAnimalsByCustomer[customerId] || [],
    [selectedAnimalsByCustomer, customerId]
  );
  const [selectedRowIds, setSelectedRowIds] = useState(selectedIds);

  useEffect(() => {
    setSelectedRowIds(selectedIds);
  }, [selectedIds]);

  const handleRowSelectionChange = useCallback((selectedRows) => {
    selectedRowsRef.current = selectedRows;
    setSelectedRowIds(selectedRows.map((a) => a.id));
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[1000px]">
        <DialogHeader>
          <DialogTitle>Pássaros</DialogTitle>
          <DialogDescription>
            Selecione os pássaros que será gerado o atestado de saúde.
          </DialogDescription>
        </DialogHeader>
        <DataTable
          columns={columnsAnimal}
          data={data.flat()}
          getAnimalRow={handleRowSelectionChange}
          columnsName={"animalName"}
          selectedRowIds={selectedRowIds}
        />
        <DialogClose asChild>
          <Button
            onClick={() => {
              const animalsData = selectedRowsRef.current.map((animal) => ({
                animal_id: animal.id,
                exame_id: exameId,
              }));
              dataToSend(animalsData);
            }}
          >
            Salvar
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};
