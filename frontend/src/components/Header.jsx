import Menu from "./Menu";
import Logo from "../assets/imgs/logo.svg?react";
import { IoExitOutline } from "react-icons/io5";
import { NavLink } from "react-router";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";
import { Sparkles } from "lucide-react";

const Header = () => {
  const { SignOut } = useContext(AuthContext);

  return (
    <div
      className={`bg-white flex flex-row w-full justify-center items-center`}
    >
      <div className="flex flex-row content-between justify-between w-[95%] py-4 items-center">
        <div className="flex flex-row gap-3 items-center justify-center">
          <NavLink
            to="/dashboard"
            className="flex flex-row gap-3 cursor-pointer"
          >
            <Logo className="w-6 h-6" />
            <p className="font-medium">Área do Veterinário</p>
          </NavLink>
          <div className="bg-[#F4F4F4] pt-5 pl-[0.2px]" />
          <div className="flex flex-row gap-6">
            <Menu to="/customers">Produtores</Menu>
            <Menu to="/birds">Pássaros</Menu>
            <Menu to="/certificates">Atestados de Saúde</Menu>
            <Menu to="/dashboard">Documentação</Menu>
          </div>
        </div>
        <div className="flex flex-row gap-2 justify-center items-center">
          <div className="flex gap-1 text-[#0b9424] flex-row rounded-full bg-[#e1fde6] border border-solid border-[#7bc488] px-2 justify-center items-center cursor-default">
            <Sparkles width={13} />
            <span className="text-[12px] font-medium">
              Alguns recursos estão em desenvolvimento.
            </span>
          </div>
          <IoExitOutline
            color="black"
            size={25}
            onClick={SignOut}
            className="cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
