import { useEffect, useState } from "react";
import { listCertificate } from "./Columns";
import { TableListCertificate } from "./TableListCertificates";
import { api } from "@/services/api";

export default function ListCertificate() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const customersList = async () => {
      try {
        const response = await api.get("/listExames?page=1&limit=300");
        setData(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    customersList();
  }, []);

  return (
    <div className="flex flex-col pt-4 w-[95%] h-full justify-center items-center content-center">
      <TableListCertificate
        columns={listCertificate}
        data={data}
        isLoading={isLoading}
      />
    </div>
  );
}
