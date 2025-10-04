import { Checkbox } from "./ui/checkbox";
import { ArrowUpDown } from "lucide-react";
import { Button } from "./ui/button";
import { withMask } from "use-mask-input";
import { CloudOff } from "lucide-react";
import { Cloud } from "lucide-react";
import { ChevronRight } from "lucide-react";
import BirdIcon from "../assets/icons/bird.svg?react";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import ButtonDashboard from "./ButtonDashboard";
import { CircleX } from "lucide-react";

import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";
import moment from "moment";
import "moment-timezone";

export const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        disabled={!row.getCanSelect()}
        onChange={row.getToggleSelectedHandler()}
        onCheckedChange={(value) => {
          row.toggleSelected(!!value);
        }}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "customerName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const formattedName = row.getValue("customerName");
      return <p className="capitalize">{formattedName.toLowerCase()}</p>;
    },
  },
  {
    accessorKey: "cpf",
    header: "CPF",
    cell: ({ row }) => {
      return (
        <div type="text" ref={withMask("999.999.999-99")}>
          {row.getValue("cpf")}
        </div>
      );
    },
  },
  {
    accessorKey: "Municipio",
    header: () => <div className="text-right">Municipio</div>,
    cell: ({ row }) => {
      const amount = row.getValue("Municipio");
      return <div className="text-right font-medium">{amount}</div>;
    },
  },
];

export const columnsAnimal = [
  {
    accessorKey: "id",
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        disabled={!row.getCanSelect()}
        onChange={row.getToggleSelectedHandler()}
        onCheckedChange={(value) => {
          row.toggleSelected(!!value);
        }}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "animalName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="px-0 m-0 p-0"
        >
          Espécie
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const formattedName = row.getValue("animalName");
      return <p className="capitalize">{formattedName.toLowerCase()}</p>;
    },
  },
  {
    accessorKey: "diamAnilha",
    header: () => <div className="text-right">Anilha</div>,
    cell: ({ row }) => {
      const anilha = row.getValue("diamAnilha");
      return <div className="text-right font-medium">{anilha}</div>;
    },
  },
  {
    accessorKey: "dsDataNascimento",
    header: () => <div className="text-right">Data de Nascimento</div>,
    cell: ({ row }) => {
      const nascimento = row.getValue("dsDataNascimento");
      const dataFormatada = nascimento
        ? new Date(nascimento).toLocaleDateString("pt-BR")
        : "";
      return <div className="text-right font-medium">{dataFormatada}</div>;
    },
  },
];

export const listCustomer = [
  {
    accessorKey: "customerName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const formattedName = row.getValue("customerName");
      return (
        <p className="capitalize pl-4 w-[10px]">
          {formattedName.toLowerCase()}
        </p>
      );
    },
  },
  {
    accessorKey: "cpf",
    header: "CPF",
    cell: ({ row }) => {
      return (
        <div
          type="text"
          ref={withMask("999.999.999-99")}
          className="font-medium w-[10px]"
        >
          {row.getValue("cpf")}
        </div>
      );
    },
  },
  {
    accessorKey: "Municipio",
    header: () => <div className="text-left">Municipio</div>,
    cell: ({ row }) => {
      const amount = row.getValue("Municipio");
      return <div className="text-left font-medium w-[10px]">{amount}</div>;
    },
  },
  {
    accessorKey: "connected",
    header: () => <div className="text-center">Status</div>,
    cell: ({ row }) => {
      const connected = row.getValue("connected");

      return connected ? (
        <div className="flex flex-row justify-center items-center">
          <Tooltip>
            <TooltipTrigger className="bg-[#CDFFC3] px-1.5 py-0.5 rounded-[6px]">
              <Cloud width={15} color="#31B517" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Conectado</p>
            </TooltipContent>
          </Tooltip>
        </div>
      ) : (
        <div className="flex flex-row justify-center items-center">
          <Tooltip>
            <TooltipTrigger asChild>
              <span
                className="bg-[#FFF0E6] px-1.5 py-0.5 rounded-[6px] cursor-pointer"
                onClick={() => {
                  console.log("clicou");
                }}
              >
                <CloudOff width={15} color="#F50B0B" className="" />
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>Sem conexão</p>
            </TooltipContent>
          </Tooltip>
        </div>
      );
    },
  },
  {
    accessorKey: "Open",
    header: () => <div className="text-right"></div>,
    cell: () => {
      return (
        <div className="flex flex-row justify-end items-end">
          <span className="px-1.5 py-0.5 rounded-[6px] cursor-pointer">
            <ChevronRight width={15} />
          </span>
        </div>
      );
    },
  },
];

export const listCertificate = [
  {
    accessorKey: "idExameDoenca",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Código
          <ArrowUpDown className="ml-0 h-4 w-[2px]" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const idExameDoenca = row.getValue("idExameDoenca");
      return <p className="capitalize pl-4 w-[2px]">{idExameDoenca}</p>;
    },
  },
  {
    accessorKey: "customer",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Produtor
          <ArrowUpDown className="ml-2 h-4 w-full" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const customeroObject = row.getValue("customer");
      const customerName = customeroObject?.customerName || "N/A";
      return (
        <p className="capitalize pl-4 w-full">{customerName.toLowerCase()}</p>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Data de Envio
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const createdDate = row.getValue("created_at");
      const createdAt = moment
        .tz(createdDate, "America/Sao_Paulo")
        .format("DD/MM/YYYY");
      return <p className="capitalize pl-4 w-[10px]">{createdAt}</p>;
    },
  },
  {
    accessorKey: "created_at",
    id: "dueDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Vencimento
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const createdDate = row.getValue("created_at");
      const createdAt = moment
        .tz(createdDate, "America/Sao_Paulo")
        .add(2, "days")
        .format("DD/MM/YYYY");
      return <p className="capitalize pl-4 w-[10px]">{createdAt}</p>;
    },
  },
  {
    accessorKey: "animals",
    header: () => <div className="text-left">Animais</div>,
    cell: ({ row }) => {
      const animals = row.getValue("animals") || [];
      const animalName = animals[0]?.animalName || "";
      return (
        <div className="flex flex-row gap-2 text-left font-medium w-full">
          <BirdIcon className="w-4 h-4 " />
          <p className="text-[12px]">
            {animals.length} {animalName}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "send",
    header: () => <div className="text-center">Status</div>,
    cell: ({ row }) => {
      // const connected = row.getValue("connected");
      const send = row.getValue("send");

      return send ? (
        <div className="flex flex-row justify-center items-center">
          <Tooltip>
            <TooltipTrigger className="bg-[#f1fcef] w-[60px] flex justify-center items-center px-2 py-0.5 rounded-full border border-solid border-[#cbe2c7]">
              <span
                className="cursor-pointer text-green-600 textarea-sm font-medium"
                onClick={() => {
                  console.log("clicou");
                }}
              >
                Enviado
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>Atestado de saúde foi enviado com sucesso!</p>
            </TooltipContent>
          </Tooltip>
        </div>
      ) : (
        <div className="flex flex-row justify-center items-center">
          <Tooltip>
            <TooltipTrigger asChild>
              <span
                className="bg-[#FFF0E6] w-[60px] flex justify-center items-center px-1.5 py-0.5 rounded-full cursor-pointer font-medium text-red-700 textarea-sm border border-solid border-[#fdd0d0]"
                onClick={() => {
                  console.log("clicou");
                }}
              >
                Falhou
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>Clique para detalhar.</p>
            </TooltipContent>
          </Tooltip>
        </div>
      );
    },
  },
  {
    accessorKey: "Open",
    header: () => <div className="text-right"></div>,
    cell: () => {
      return (
        <div className="flex flex-row justify-end items-end">
          <span className="px-1.5 py-0.5 rounded-[6px] cursor-pointer">
            <ChevronRight width={15} />
          </span>
        </div>
      );
    },
  },
];

export const listGTA = [
  {
    accessorKey: "nm_proprietario",
    cell: ({ row }) => {
      const formattedName = row.getValue("nm_proprietario");
      const specieName = row.original.nm_especie_animal;
      return (
        <div className="flex flex-row w-full justify-between">
          <p className="capitalize w-full h-full text-[14px] font-medium text-wrap">
            {formattedName.toLowerCase()}
          </p>
          <p className="capitalize text-[12px] w-fit text-[#7e7e7e]">
            {specieName.toLowerCase()}
          </p>
        </div>
      );
    },
  },
];

export const listCustomerAnimal = [
  {
    accessorKey: "customerName",
    header: () => <div className="text-left">Produtor</div>,
    cell: ({ row }) => {
      const producterName = row.original.customer.customerName;
      return (
        <div className="flex flex-row w-full justify-between">
          <p className="capitalize w-full h-full text-[14px] font-medium text-wrap">
            {producterName.toLowerCase()}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "cpf",
    header: () => <div className="text-left">CPF</div>,
    cell: ({ row }) => {
      const document = row.original.customer.cpf;
      return (
        <div type="text" ref={withMask("999.999.999-99")}>
          {document}
        </div>
      );
    },
  },
  {
    id: "status",
    header: () => <div className="text-right">Status</div>,
    cell: ({ row, table }) => {
      // Pegue o array de seleção via meta
      const payload = table.options.meta?.payload || [];
      const customerFilhos = row.original.customer?.customerFilho || [];

      // Verifica se algum filho desse customerPai tem animais selecionados
      const hasSelected = customerFilhos.some((filho) =>
        payload.some(
          (item) =>
            item.filhoId === filho.id && item.animals && item.animals.length > 0
        )
      );

      return (
        <div className="flex flex-row justify-end items-end">
          {hasSelected ? (
            <ButtonDashboard variant="tag">Selecionado</ButtonDashboard>
          ) : (
            <ButtonDashboard variant="tag-error">Selecione</ButtonDashboard>
          )}
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];

export const listAnimal = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "animalName",
    header: () => <div className="text-left">Espécie</div>,
    cell: ({ row }) => {
      const producterName = row.original.animalName;
      return (
        <div className="flex flex-row w-full justify-between">
          <p className="capitalize w-full h-full text-[14px] font-medium text-wrap">
            {producterName}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "birthDate",
    header: () => <div className="text-left">Data de Nascimento</div>,
    cell: ({ row }) => {
      const nascimento = row.getValue("birthDate");
      const dataFormatada = nascimento
        ? new Date(nascimento).toLocaleDateString("pt-BR")
        : "";
      return <div className="text-left font-medium">{dataFormatada}</div>;
    },
  },
  {
    accessorKey: "animalAnilha",
    header: () => <div className="text-left">Anilha</div>,
    cell: ({ row }) => {
      const anilha = row.original.animalAnilha;
      return (
        <div className="flex flex-row w-full justify-between">
          <p className="capitalize w-full h-full text-[14px] font-medium text-wrap">
            {anilha}
          </p>
        </div>
      );
    },
  },
];

export const listExames = [
  {
    accessorKey: "idExameDoenca",
    header: () => <div className="text-left">Nº Atestado</div>,
    cell: ({ row }) => {
      const id = row.getValue("idExameDoenca");
      const sendExame = row.original.SendExame;

      const handleCopy = (e) => {
        e.stopPropagation();
        navigator.clipboard.writeText(id);
        toast.success("Código copiado");
      };

      return sendExame ? (
        <ButtonDashboard onClick={handleCopy} variant="tag">
          <Copy className="w-4 h-4" />
          <p className="capitalize w-full h-full font-medium text-wrap">{id}</p>
        </ButtonDashboard>
      ) : (
        <ButtonDashboard variant="tag-error">
          <CircleX className="w-4 h-4" />
          <p className="w-full h-full font-medium text-wrap">Cancelado</p>
        </ButtonDashboard>
      );
    },
  },
  {
    accessorKey: "customerName",
    header: () => <div className="text-left">Nome do Produtor</div>,
    cell: ({ row }) => {
      const producterName = row.original.filho.Customer.customerName;
      return <div className="text-left font-medium capitalize">{producterName.toLowerCase()}</div>;
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Data de Envio
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const createdDate = row.getValue("created_at");
      const createdAt = moment
        .tz(createdDate, "America/Sao_Paulo")
        .format("DD/MM/YYYY");
      return <p className="capitalize pl-4 w-[10px]">{createdAt}</p>;
    },
  },
  {
    accessorKey: "created_at",
    id: "dueDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Vencimento
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const createdDate = row.getValue("created_at");
      const createdAt = moment
        .tz(createdDate, "America/Sao_Paulo")
        .add(2, "days")
        .format("DD/MM/YYYY");
      return <p className="capitalize pl-4 w-[10px]">{createdAt}</p>;
    },
  },
  {
    accessorKey: "nm_especie_animal",
    header: () => <div className="text-left">Espécie</div>,
    cell: ({ row }) => {
      const specie = row.original.filho.nm_especie_animal;
      return (
        <div className="flex flex-row w-full justify-between">
          <p className="capitalize w-full h-full text-[14px] font-medium text-wrap">
            {specie.toLowerCase()}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "animals",
    header: () => <div className="text-left">Qtd. Animais</div>,
    cell: ({ row }) => {
      const specie = row.original.filho.nm_especie_animal;
      const animals = row.original.exameAnimals || [];
      return (
        <div className="capitalize flex flex-row gap-2 text-left font-medium w-full">
          <BirdIcon className="w-4 h-4 " />
          <p className="text-[12px]">
            {animals.length} {specie.toLowerCase()}
          </p>
        </div>
      );
    },
  },
];
