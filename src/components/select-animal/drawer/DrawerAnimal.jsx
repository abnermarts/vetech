import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useContext } from "react";
import { TableAnimal } from "./TableAnimal";
import { listAnimal } from "@/components/Columns";
import { SelectAnimalsContext } from "@/context/SelectAnimalsContext";


export default function DrawerAnimal({ children, data, initialSelectedAnimals = {}, onSaveAnimals }) {
  const [organizedData, setOrganizedData] = useState([]);
  const [selectedAnimals, setSelectedAnimals] = useState(initialSelectedAnimals);
  const animalSelecteds = useContext(SelectAnimalsContext);


  useEffect(() => {
    setOrganizedData(
      data.customer.customerFilho.map((explorationUnit) =>
        explorationUnit.animals.map((animal) => ({
          id: animal.id, // ou `${explorationUnit.id}_${animal.id}` se precisar garantir unicidade
          filhoId: explorationUnit.id,
          explorationUnitId: explorationUnit.id_unidade_exploracao,
          animalId: animal.id,
          animalName: animal.dsIdentificacaoAnimal,
          birthDate: animal.dsDataNascimento,
          animalAnilha: animal.diamAnilha,
        }))
      )
    );
    setSelectedAnimals(initialSelectedAnimals); // <-- inicializa com selecionados do pai
  }, [data, initialSelectedAnimals]);

  // Função para alternar seleção
  const handleSelectAnimal = (animal) => {
    setSelectedAnimals((prev) => {
      const current = new Set(prev[animal.filhoId] || []);
      if (current.has(animal.animalId)) {
        current.delete(animal.animalId);
      } else {
        current.add(animal.animalId);
      }
      return { ...prev, [animal.filhoId]: current };
    });
  };

  // Monta o array para o POST
  const getPayload = () =>
    Object.entries(selectedAnimals)
      .map(([filhoId, animalSet]) => ({
        filhoId,
        animals: Array.from(animalSet).map((animal_id) => ({ animal_id })),
      }))
      .filter((item) => item.animals.length > 0); // <-- só inclui se houver animais

  // Exemplo de uso no botão "Selecionar e Salvar"
  const handleSave = () => {
    if (onSaveAnimals) onSaveAnimals(selectedAnimals);
    const payload = getPayload();
    animalSelecteds.current = payload;
    // Faça o POST aqui
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>
            Escolha Dos Animais - {data.customer.customerName}
          </DialogTitle>
          <DialogDescription>
            Clique na linha do animal para selecioná-lo e após isso, clique no
            botão "Salvar" para confirmar a seleção.
          </DialogDescription>
        </DialogHeader>
        <TableAnimal
          data={organizedData.flat()}
          columns={listAnimal}
          columnsName="animalName"
          onRowClick={handleSelectAnimal}
          selectedAnimals={selectedAnimals}
        />
        <DialogClose asChild>
          <div className="flex flex-row justify-between">
            <Button variant="outline">Cancelar</Button>
            <Button onClick={handleSave}>Selecionar e Salvar</Button>
          </div>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
