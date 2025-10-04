import { useEffect, useState } from "react";
import { columns } from "./Columns";
import { DataTable } from "./Data-Table";
import { api } from "@/services/api";

export default function CustomersPage() {
  const [data, setData] = useState([]);
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const customersList = async () => {
      try {
        const response = await api.get("/listCustomer");
        setData(response.data);
      } catch (error) {
        console.log(error);
      } finally {
      setIsLoading(false);
    }
    };
    customersList();
  }, []);

  function handleRowSelectionChange(selectedRows) {
    setSelectedRowIds(selectedRows.map((row) => row.id));
  }

  return (
    <div className="flex flex-col py-10 w-[95%] justify-center items-center content-center">
      <DataTable
        columns={columns}
        data={data}
        columnsName={"customerName"}
        selectedRowIds={selectedRowIds}
        getAnimalRow={handleRowSelectionChange}
        isLoading={isLoading}
      />
    </div>
  );
}
