import { useEffect, useState } from "react";
import { listGTA } from "./Columns";
import { TableListGTA } from "./TableListGTA";
import { api } from "@/services/api";
import { Events } from "@/constants/eventsMock";
import EventsCard from "./EventsCard";
import { EventDetailContext } from "@/context/EventDetailContext";
import { useContext } from "react";


export default function ListGenerateGTA() {

  const { dataDetail } = useContext(EventDetailContext);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const customersList = async () => {
      try {
        const response = await api.get("/listCustomer");
        setData(response.data);
      } catch (error) {
        console.log(error);
      }finally {
        setIsLoading(false);
      }
    };
    customersList();
  }, []);

  return (
    <div className="flex flex-row pt-4 w-[95%] gap-2 h-[calc(100vh-120px)] justify-center items-start content-center">
      <TableListGTA
        columns={listGTA}
        data={Events.data}
        columnsName={"nm_proprietario"}
        isLoading={isLoading}
      />
      <div className="flex w-full h-full">
        <EventsCard />
      </div>
    </div>
  );
}
