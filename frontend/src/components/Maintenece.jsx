import { CircleAlert  } from "lucide-react";

const Maintenence = () => {
  return (
    <div className="flex flex-row bg-[#F8F8F8] w-[500px] px-4 py-4 rounded-lg gap-3 justify-start items-start border-1 border-solid border-[#F2F2F2]">
      <span className="bg-[#F82B20] rounded-4xl py-0 px-1 justify-center items-center">
        <CircleAlert  width={15} color="#FFFFFF" strokeWidth={3}/>
      </span>
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium">
          Alguns recursos desta página ainda estão em desenvolvimento.
        </p>
        <p className="text-sm font-normal text-[#464646]">
          Esta página faz parte de uma versão em desenvolvimento do sistema. Em
          breve, todos os recursos estarão disponíveis.
        </p>
      </div>
    </div>
  );
};

export default Maintenence;
