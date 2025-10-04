import Header from "@/components/Header";
import ListGenerateGTA from "@/components/ListGenerateGTA";
import { EventDetailContext } from "@/context/EventDetailContext";
import { useState, useEffect } from "react";
import { api } from "@/services/api";
import { Events } from "@/constants/eventsMock";

const GenerateGTA = () => {

  // useEffect(() => {
  //   const customersList = async () => {
  //     try {
  //       const response = await api.get("/listCustomer");
  //       setDataDetail(response.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   customersList();
  // }, []);

  const [dataDetail, setDataDetail] = useState(Events.data[0]);

  const name = "Ovino";

  return (
    <EventDetailContext.Provider value={{ name, dataDetail, setDataDetail }}>
      <div className="bg-[#F2F2F2] h-screen min-h-screen max-h-screen items-center flex flex-col justify-start ">
        <Header />
        <div className="flex flex-col w-[95%] h-auto items-center  bg-[#F2F2F2] rounded-lg">
          {/* <div className="w-[95%]">
            <div className="flex flex-row justify-between">
              <div className="flex flex-col">
                <h2 className="font-medium text-[1.5rem] cursor-default">
                  Eventos disponíveis
                </h2>
              </div>
            </div>
          </div> */}
          <ListGenerateGTA />
        </div>
      </div>
    </EventDetailContext.Provider>
  );
};

export default GenerateGTA;
