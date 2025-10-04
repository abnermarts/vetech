import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import BreadcrumbComponent from "./Breadcrumb";
import moment from "moment";
import "moment-timezone";

import { TriangleAlert } from "lucide-react";

const DialogDetailCertificate = ({ data, open, onOpenChange }) => {
  const dueDate = moment
    .tz(data.created_at, "America/Sao_Paulo")
    .add(2, "days")
    .format("DD/MM/YYYY");

  const createdAt = moment
    .tz(data.created_at, "America/Sao_Paulo")
    .format("DD/MM/YYYY");

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex flex-col p-8 min-w-[600px] min-h-full">
        <SheetHeader className="m-0 p-0">
          <BreadcrumbComponent
            page={`Atestado de Saúde `}
          />
          <SheetTitle className="capitalize">#{data.idExameDoenca}</SheetTitle>
          <SheetDescription asChild>
            <div>
              <div className="flex flex-row gap-4 px-4 py-4 rounded-lg bg-[#f3f3f36c] justify-between border border-solid border-[#e0e0e0]">
                <div className="flex flex-col gap-2">
                  <span>
                    <p className="text-[12px] text-[#464646]">Produtor</p>
                    <p className="capitalize text-black">
                      {data.customer.customerName.toLowerCase()}
                    </p>
                  </span>
                  <span>
                    <p className="text-[12px] text-[#464646]">Município</p>
                    <p className="capitalize text-black">
                      {data.customer.Municipio}
                    </p>
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <span>
                    <p className="text-[12px] text-[#464646]">Espécie</p>
                    <p className="capitalize text-black">
                      {data.animals[0].animalName}
                    </p>
                  </span>
                  <span>
                    <p className="text-[12px] text-[#464646]">Status</p>
                    <p className="capitalize text-black">
                      {data.send ? (
                        <span className="cursor-pointer text-green-600 textarea-sm w-[60px] flex justify-center px-1.5 py-0.5 font-medium rounded-full border border-solid border-[#cbe2c7] bg-[#f1fcef]">
                          Enviado
                        </span>
                      ) : (
                        <span className="bg-[#FFF0E6] w-[60px] flex justify-center items-center px-1.5 py-0.5 rounded-full cursor-pointer font-medium text-red-700 textarea-sm border border-solid border-[#fdd0d0]">
                          Falhou
                        </span>
                      )}
                    </p>
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <span>
                    <p className="text-[12px] text-[#464646]">
                      Data de Vencimento
                    </p>
                    <p className="capitalize text-black">{dueDate}</p>
                  </span>
                  <span>
                    <p className="text-[12px] text-[#464646]">Data de Envio</p>
                    <p className="capitalize text-black">{createdAt}</p>
                  </span>
                </div>
              </div>
              {data.mensagemErro && (
                <span
                  className="flex
               flex-row gap-2 text-[#C9281F] border-[#EE9894] border-solid cursor-default mt-2 border-1 text-left text-[12px]/6 p-2 justify-center self-center items-start rounded-lg bg-[#FFEFEE]"
                >
                  <TriangleAlert className="w-6" color="#C9281F" />
                  <p>{data.mensagemErro}</p>
                </span>
              )}
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
          <TableBody key={data.idExameDoenca || "Erro"}>
            {data.animals.map((animal) => (
              <TableRow key={animal.id}>
                <TableCell>
                  {animal.sexoId === "1" ? "Macho" : "Fêmea"}
                </TableCell>
                <TableCell>{animal.diamAnilha}</TableCell>
                <TableCell className="text-right">
                  {new Date(animal.dsDataNascimento).toLocaleDateString(
                    "pt-BR"
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* {data.status == "Erro"
          ? producter.dados.message.error.map((error) => (
              <span
                className="flex
               flex-row gap-2 text-[#C9281F] border-[#EE9894] border-solid border-1 text-left text-sm/6 p-4 justify-center self-center items-center rounded-lg bg-[#FFEFEE]"
              >
                <TriangleAlert className="w-12" color="#C9281F" />
                <p>{error}</p>
              </span>
            ))
          : ""} */}
      </SheetContent>
    </Sheet>
  );
};

export default DialogDetailCertificate;
