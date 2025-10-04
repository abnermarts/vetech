import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import CustomerIcon from "../assets/icons/customer.svg?react";
import { TriangleAlert } from "lucide-react";

const DialogSheetListAnimal = ({ children, producter }) => {
  return (
    <Sheet>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent className="flex flex-col p-8 min-w-[600px] min-h-full">
        <SheetHeader className="m-0 p-0">
          <SheetTitle>Visualize detalhes</SheetTitle>
          <SheetDescription asChild>
            <div className="flex flex-col gap-4">
              <p>Confira detalhes do atestado de saúde.</p>
              <span className="flex capitalize w-fit not-last:flex-row gap-1 py-1 px-3 items-center bg-white rounded-lg border border-[#D6D6D6]">
                <CustomerIcon className="w-fit h-4 text-white" />
                <p className="capitalize text-black">
                  {producter.payload?.propriedade?.pessoaTitular?.nmPessoa.toLowerCase()}
                </p>
              </span>
            </div>
          </SheetDescription>
        </SheetHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sexo</TableHead>
              <TableHead>Cód. Anilha</TableHead>
              <TableHead className="text-right">Data de Nascimento</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody key={producter?.dados?.data?.dsChaveValidacao || "Erro"}>
            {producter.payload.listaExameDoencaIdentificacaoAnimal.Created.map(
              (animal) => (
                <TableRow key={animal.id}>
                  <TableCell>{animal.tipoSexo.dsFlag}</TableCell>
                  <TableCell>{animal.dsIdentificacaoAnimal}</TableCell>
                  <TableCell className="text-right">
                    {animal.dsDataNascimento}
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
        {producter.status == "Erro" ? producter.dados.message.error.map((error) => (
          <span
            className="flex
               flex-row gap-2 text-[#C9281F] border-[#EE9894] border-solid border-1 text-left text-sm/6 p-4 justify-center self-center items-center rounded-lg bg-[#FFEFEE]"
          >
            <TriangleAlert className="w-12" color="#C9281F" />
            <p>{error}</p>
          </span>
        )) : ""}
      </SheetContent>
    </Sheet>
  );
};

export default DialogSheetListAnimal;
