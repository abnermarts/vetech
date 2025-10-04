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
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Calendar } from "lucide-react";
import { File } from "lucide-react";
import { Truck } from "lucide-react";

import moment from "moment-timezone";

export const DialogCertificateDetail = ({ children, row }) => {
  const createdAt = moment
    .tz(row.created_at, "America/Sao_Paulo")
    .format("DD/MM/YYYY");

  const dueDate = moment
    .tz(row.created_at, "America/Sao_Paulo")
    .add(2, "days")
    .format("DD/MM/YYYY");

  console.log(row);

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col p-0 min-w-[500px] min-h-full rounded-l-[16px]">
        <SheetHeader className="border-b-1 border-dashed">
          <SheetTitle>#{row.id}</SheetTitle>
          <SheetDescription>
            {row.filho.Customer.customerName} · {createdAt}
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col px-4 py-6 m-0 gap-3.5 border-b-1 border-dashed">
          <p className="text-[11px] font-medium text-[#8f8f8f] uppercase tracking-wide">
            Detalhes do Atestado de Saúde
          </p>
          <div className="flex flex-row justify-between">
            <span className="flex flex-row gap-4 justify-center align-center">
              <File className="w-4" strokeWidth={1.5} color="#242424" />
              <p className="text-[14px] font-normal text-[#242424]">
                Nº Atestado
              </p>
            </span>
            <p className="text-[14px] font-medium text-[#000000]">
              {row.idExameDoenca}
            </p>
          </div>
          <div className="flex flex-row justify-between">
            <span className="flex flex-row gap-4 justify-center align-center">
              <Calendar className="w-4" strokeWidth={1.5} color="#242424" />
              <p className="text-[14px] font-normal text-[#242424]">
                Data de Vencimento
              </p>
            </span>
            <p className="text-[14px] font-medium text-[#000000]">{dueDate}</p>
          </div>
          <div className="flex flex-row justify-between">
            <span className="flex flex-row gap-4 justify-center align-center">
              <Truck className="w-4" strokeWidth={1.5} />
              <p className="text-[14px] font-normal text-[#242424]">
                Guia de Trânsito Animal
              </p>
            </span>
            <p className="text-[14px] font-medium text-[#000000]">Pendente</p>
          </div>
        </div>
        <div className="flex flex-col px-4 py-6 m-0 gap-3.5 border-b-1 border-dashed">
          <p className="text-[11px] font-medium text-[#8f8f8f] uppercase tracking-wide">
            Animais
          </p>
          <Table>
            <TableCaption>
              Lista de animais vinculados no atestado de saúde.
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Sexo</TableHead>
                <TableHead>Anilha</TableHead>
                <TableHead className="text-right">Data de Nascimento</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {row.exameAnimals.map((animal) => (
                <TableRow key={animal.animals.id}>
                  <TableCell className="font-medium">
                    {animal.animals.sexoId === "1" ? "Macho" : "Fêmea"}
                  </TableCell>
                  <TableCell>{animal.animals.diamAnilha}</TableCell>
                  <TableCell className="text-right">
                    {moment
                      .tz(animal.animals.dsDataNascimento, "America/Sao_Paulo")
                      .format("DD/MM/YYYY")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {row.errorTableExame.length > 0 && (
          <>
            <div className="flex flex-col px-4 py-6 m-0 gap-3.5 border-b-1 border-dashed">
              <p className="text-[11px] font-medium text-[#8f8f8f] uppercase tracking-wide">
                Erros encontrados
              </p>
              {row.errorTableExame.map((error) => {
                return (
                  <p className="text-[12px] font-normal text-[#7c2f2f]">
                    {error.text}
                  </p>
                );
              })}
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};
