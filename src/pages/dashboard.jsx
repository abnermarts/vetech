import React from "react";
import DashboardBird from "../assets/imgs/dashboard-bird.png?react";
import { RxDashboard } from "react-icons/rx";
import { NavLink } from "react-router";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

import BirdIcon from "../assets/icons/bird.svg?react";
import CustomerIcon from "../assets/icons/customer-white.svg?react";
import DialogSheet from "@/components/DialogSheet";
import ButtonDashboard from "@/components/ButtonDashboard";
import ClipIcon from "../assets/icons/clipboard.svg?react";
import Header from "@/components/Header";
import DialogCustomer from "@/components/DialogSheetCustomer";
import Maintenence from "@/components/Maintenece";
import { Truck } from "lucide-react";
import { api } from "@/services/api";

const Dashboard = () => {
  const relatedId = Date.now();
  const { user } = useContext(AuthContext);

  return (
    <div className="flex flex-col w-full h-dvh justify-center items-center bg-[#F2F2F2]">
      {/* Header Topo */}
      <Header />
      <div className="flex flex-col w-[95%]">
        {/* Header Banner */}
        <div
          style={{
            backgroundImage: `url(${DashboardBird})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
          className="w-full h-[300px] p-12 rounded-b-lg flex flex-col justify-between content-between"
        >
          <div className="flex flex-row items-center gap-1 text-white opacity-75">
            <RxDashboard />
            <span className="font-light text-[0.9rem] cursor-default">
              Dashboard
            </span>
          </div>
          <div className="flex flex-col w-full gap-5">
            <div>
              <h2 className="text-white font-medium text-[1.5rem] cursor-default capitalize">
                Olá,{" "}
                {user?.name ? user.name.split(" ")[0].toLowerCase() : "usuário"}
              </h2>
              <p className="text-[#EAEAEA] font-light text-[0.9rem] cursor-default">
                Ganhe tempo com automações em documentos e gestão veterinária.
              </p>
            </div>
            <div className="border-[0.5px] border-[#fbfbfb80] w-full" />
            <div className="flex flex-row gap-5">
              <NavLink
                to={`/form/${relatedId}`}
                className=" bg-black/30 backdrop-blur-sm px-8 py-4 flex flex-row gap-2 text-white w-fit rounded-lg cursor-pointer text-[0.8rem] font-medium border border-white/20 hover:bg-black/50 transition ease-linear duration-300"
              >
                <ClipIcon className="w-4 h-4" />
                Criar atestado de saúde
              </NavLink>
              <NavLink className=" bg-black/30 backdrop-blur-sm px-8 py-4 flex flex-row gap-2 text-white w-fit rounded-lg cursor-pointer text-[0.8rem] font-medium border border-white/20 hover:bg-black/50 transition ease-linear duration-300">
                <Truck className="w-4 h-4" />
                Gerar guia de trânsito animal
              </NavLink>
              <DialogSheet headerTitle="Cadastrar novo animal">
                <ButtonDashboard>
                  <BirdIcon className="w-4 h-4" />
                  Cadastrar novo animal
                </ButtonDashboard>
              </DialogSheet>
              <DialogCustomer headerTitle="Cadastrar novo cliente">
                <ButtonDashboard>
                  <CustomerIcon className="w-4 h-4 " />
                  Cadastrar novo produtor
                </ButtonDashboard>
              </DialogCustomer>
            </div>
          </div>
        </div>
      </div>
      {/* Atestados de Saúde */}
      <div className="flex flex-col w-[95%] h-full bg-white m-5 p-5 rounded-lg">
        <Maintenence />
      </div>
    </div>
  );
};

export default Dashboard;
