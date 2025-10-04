import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SelectSpecie } from "./SelectSpecie";
import { SelectCustomerSon } from "./SelectCustomerSon";
import { SelectSexo } from "./SelectSexo";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { ComboboxDemo } from "./ComboBox";

import { api } from "@/services/api";

const DialogSheet = ({ children, headerTitle }) => {
  const [isLoadingSpecie, setIsLoadingSpecie] = useState(true);
  const specieData = useRef([]);
  const [specie, setSpecie] = useState();

  const [customerSons, setCustomerSons] = useState([]);
  const [isLoadingSons, setIsLoadingSons] = useState(false);
  const [dsDataNascimento, setDsDataNascimento] = useState("");
  const [sexoId, setSexoId] = useState("");
  const [diamAnilha, setDiamAnilha] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    if (specie && specie.id) {
      setIsLoadingSons(true);
      api
        .get(`/listCustomerSon/${specie.id}`)
        .then((response) => setCustomerSons(response.data))
        .finally(() => setIsLoadingSons(false));
    } else {
      setCustomerSons([]);
    }
  }, [specie]);

  useEffect(() => {
    fetchSpecieData();
  }, []);

  async function fetchSpecieData() {
    const response = await api.get("/listSpecie");
    specieData.current = response.data;
    setIsLoadingSpecie(false);
    setIsLoadingSons(false);
  }

  function handleSheetOpenChange(open) {
    if (!open) {
      setSpecie();
    }
  }

  const isFormValid =
    !!dsDataNascimento &&
    !!sexoId &&
    !!specie?.id &&
    !!diamAnilha &&
    !!selectedCustomer?.id;

  return (
    <Sheet onOpenChange={handleSheetOpenChange}>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent className="flex flex-col p-8 min-w-[500px]">
        <SheetHeader className="m-0 p-0">
          <SheetTitle>{headerTitle}</SheetTitle>
          <SheetDescription>
            Insira os dados e clique em "Cadastrar".
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col items-start gap-2 w-full">
            <Label htmlFor="Sexo" className="text-right">
              Espécie
            </Label>
            {!isLoadingSpecie && specieData.current.length > 0 ? (
              <SelectSpecie
                values={specieData.current}
                label="Espécies"
                description="Selecione a espécie"
                onChange={setSpecie}
              />
            ) : (
              <span class="loading loading-infinity loading-xl" />
            )}
          </div>
          {specie && (
            <div className="flex flex-col items-start gap-2 w-full">
              {isLoadingSons ? (
                <span class="loading loading-infinity loading-xl" />
              ) : (
                <div className="flex flex-col gap-4 w-full">
                  <div className="flex flex-col gap-2 w-full">
                    <Label htmlFor="CustomerSon" className="text-right">
                      Produtor
                    </Label>
                    <ComboboxDemo
                      values={customerSons
                        .slice()
                        .sort((a, b) =>
                          a.Customer.customerName.localeCompare(
                            b.Customer.customerName
                          )
                        )}
                      description="Selecione o produtor"
                      onChange={setSelectedCustomer}
                    />
                  </div>
                  {/* <div className="flex flex-col gap-2 w-full">
                    <Label htmlFor="CustomerSon" className="text-right">
                      Produtor
                    </Label>
                    <SelectCustomerSon
                      values={customerSons}
                      label="Produtor"
                      description="Selecione o produtor"
                      onChange={setSelectedCustomer}
                    />
                  </div> */}
                  <div className="flex flex-col gap-2 w-full">
                    <Label htmlFor="dsDataNascimento">Data de Nascimento</Label>
                    <Input
                      id="dsDataNascimento"
                      type="date"
                      value={dsDataNascimento}
                      onChange={(e) => setDsDataNascimento(e.target.value)}
                      max="9999-12-31" // Limita o ano a 4 dígitos
                    />
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    <Label htmlFor="sexoId">Sexo</Label>
                    <SelectSexo value={sexoId} onChange={setSexoId} />
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    <Label htmlFor="diamAnilha">Código da Anilha</Label>
                    <Input
                      id="diamAnilha"
                      type="text"
                      value={diamAnilha}
                      onChange={(e) => setDiamAnilha(e.target.value)}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        <SheetFooter>
          <Button
            type="submit"
            className="cursor-pointer"
            onClick={async () => {
              const data = {
                dsDataNascimento: dsDataNascimento
                  ? new Date(dsDataNascimento).toISOString()
                  : "",
                dsPelagem: "Característica",
                sexoId,
                specieId: specie?.id,
                diamAnilha,
                customerId: selectedCustomer?.id,
              };
              try {
                await api.post("/createanimal", data);
                toast.success("Animal cadastrado com sucesso!");
                setSexoId("");
                setDiamAnilha("");
                setDsDataNascimento("");
              } catch (error) {
                toast.error(error.response.data.error);
              }
            }}
            disabled={!isFormValid}
          >
            Cadastrar
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default DialogSheet;
