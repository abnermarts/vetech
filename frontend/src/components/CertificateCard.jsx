import BirdIcon from "../assets/icons/bird.svg?react";
import CustomerIcon from "../assets/icons/customer.svg?react";
import { Copy } from "lucide-react";
import { useRef } from "react";
import { toast } from "sonner";
import moment from "moment";
import { ChevronRight } from "lucide-react";
import DialogSheetListAnimal from "./DialogSheetListAnimal";
import { TriangleAlert } from "lucide-react";

const CertificateCard = ({
  variant,
  code,
  name,
  length,
  specie,
  animalData,
}) => {
  const codeRef = useRef(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    toast.success("Código copiado");
  };

  return (
    <div className="flex flex-col w-[600px] bg-white px-4 py-2 rounded-lg gap-3 border border-[#e4e4e4]">
      <div className="flex flex-col gap-5">
        <div className="flex flex-row justify-between font-medium text-[0.8rem] text-[#242424]">
          {variant == "Sucesso" ? (
            <span className="flex flex-row gap-2 py-0 px-0 justify-center text-center self-center items-center">
              <h3 ref={codeRef}>#{code}</h3>
              <Copy className="w-4 cursor-pointer" onClick={handleCopy} />
            </span>
          ) : (
            <DialogSheetListAnimal producter={animalData} asChild>
              <span
                className="flex cursor-pointer
               flex-row gap-2 text-[#C9281F] py-0 px-4 justify-center text-center self-center items-center rounded-lg bg-[#FFEFEE]"
              >
                <TriangleAlert
                  className="w-4"
                  onClick={handleCopy}
                  color="#C9281F"
                />
                <h3>Erro ao gerar atestado de saúde</h3>
              </span>
            </DialogSheetListAnimal>
          )}
          <span>{moment().format("DD.MM.YYYY")}</span>
        </div>
        <div className="flex flex-row gap-5 text-[0.8rem] justify-between w-full h-full self-end content-end">
          <div className="flex flex-row gap-2">
            <span className="flex capitalize not-last:flex-row gap-1 py-1 px-3 justify-center text-center self-center items-center bg-white rounded-lg border border-[#D6D6D6]">
              <CustomerIcon className="w-4 h-4 text-white" />
              <p>{name}</p>
            </span>
            <span className="flex flex-row gap-1 py-1 px-3 justify-center text-center self-center items-center bg-white rounded-lg border border-[#D6D6D6]">
              <BirdIcon className="w-4 h-4 " />
              <p>
                {length} {specie}
              </p>
            </span>
          </div>
          <DialogSheetListAnimal producter={animalData}>
            <span
              className={`flex cursor-pointer flex-row justify-center text-center items-center w-max rounded-lg self-center}`}
            >
              <p className="font-medium">Detalhes</p>
              <ChevronRight className="w-4" />
            </span>
          </DialogSheetListAnimal>
        </div>
      </div>
    </div>
  );
};

export default CertificateCard;
