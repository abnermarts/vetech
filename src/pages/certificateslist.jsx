import Header from "@/components/Header";
import DemoPage from "@/components/Table";
import BreadcrumbComponent from "@/components/Breadcrumb";
import DialogCustomer from "@/components/DialogSheetCustomer";
import ButtonDashboard from "@/components/ButtonDashboard";
import Maintenence from "@/components/Maintenece";
import ListCertificate from "@/components/ListCertificate";
import { TableLisExam } from "@/components/view-exames/TableListExam";
import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { listExames } from "@/components/Columns";

const CertificateList = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const customersList = async () => {
      try {
        const response = await api.get("/listExame");
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
    <div className="bg-[#F2F2F2] h-full min-h-lvh items-center flex flex-col justify-start">
      <Header />
      <div className="flex flex-col w-[95%] items-center px-8 my-4 py-2 h-full min-h-full bg-white rounded-lg ">
        <div className="w-full">
          <BreadcrumbComponent page="Atestados de Saúde" />
          <div className="flex flex-row justify-between">
            <div>
              <h2 className="font-medium text-[1.5rem] cursor-default">
                Atestados de Saúde
              </h2>
              <p className="text-[#797979] font-regular text-[0.9rem] cursor-default pb-3">
                Confira os últimos atestados de saúde gerados.
              </p>
            </div>
            <DialogCustomer headerTitle="Cadastrar novo cliente">
              <ButtonDashboard variant="secondary">
                Cadastrar novo cliente
              </ButtonDashboard>
            </DialogCustomer>
          </div>
        </div>
        <TableLisExam
          data={data}
          columns={listExames}
          columnsName="customerName"
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default CertificateList;
