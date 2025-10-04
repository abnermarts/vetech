import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

import { useState, useEffect } from "react";
import LoaderIcon from "../assets/icons/loader-circle.svg?react";
import { withMask } from "use-mask-input";
import { api } from "@/services/api";

const DialogCustomer = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [cpf, setCpf] = useState("");

  useEffect(() => {
    const cpfDigits = cpf.replace(/\D/g, "");
    async function fetchCustomerData() {
      setIsLoading(true);
      const cpfDigits = cpf.replace(/\D/g, "");

      try {
        await api.post("/createCustomer", {
          cpf: cpfDigits,
        });
        toast.success("Produtor cadastrado com sucesso!");
      } catch (error) {
        toast.error(error.response.data.error);
        setIsLoading(false);
      }
      setIsLoading(false);
    }
    if (cpfDigits.length === 11) {
      fetchCustomerData();
    }
  }, [cpf]);

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cadastrar produtor</DialogTitle>
          <DialogDescription>
            Insira o CPF do produtor para cadastrar.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="flex flex-col items-start gap-2 w-full">
            <Label htmlFor="cpf" className="text-right w-auto">
              CPF
            </Label>
            <Input
              id="cpf"
              placeholder="000.000.000-00"
              className="col-span-3 w-full no-underline"
              ref={withMask("999.999.999-99")}
              type="text"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
            />
            <a className="text-xs text-neutral-500">
              Após inserir o CPF completo, aguarde finalizar a solicitação.
            </a>
          </div>
          {isLoading ? (
            <>
              <LoaderIcon className="animate-spin" />
            </>
          ) : (
            <></>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogCustomer;
