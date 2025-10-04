import { useEffect, useState } from "react";
import { listCustomer } from "./Columns";
import { TableListCustomer } from "./TableListCustomer";
import { api } from "@/services/api";

export default function ListCustomer() {
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
    <div className="flex flex-col pt-4 w-full h-full justify-center items-center content-center">
      <TableListCustomer
        columns={listCustomer}
        data={data}
        columnsName={"customerName"}
        isLoading={isLoading}
      />
    </div>
  );
}
