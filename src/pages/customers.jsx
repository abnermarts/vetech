import Header from "@/components/Header";
import ListCustomer from "@/components/ListCustomer";
import BreadcrumbComponent from "@/components/Breadcrumb";
import DialogCustomer from "@/components/DialogSheetCustomer";
import ButtonDashboard from "@/components/ButtonDashboard";
import Maintenence from "@/components/Maintenece";

const Customers = () => {
  return (
    <div className="bg-[#F2F2F2] h-full min-h-lvh items-center flex flex-col justify-start">
      <Header />
      <div className="flex flex-col w-[95%] items-center px-8 my-4 py-2 h-full min-h-full bg-white rounded-lg ">
        <div className="w-full">
          <BreadcrumbComponent page="Produtores" />
          <div className="flex flex-row justify-between">
            <div className="flex flex-col">
              <h2 className="font-medium text-[1.5rem] cursor-default">
                Produtores
              </h2>
              <p className="text-[#797979] font-regular text-[0.9rem] cursor-default pb-3">
                Aqui você pode cadastrar, excluir e gerenciar o cadastro de seus
                produtores
              </p>
            </div>
            <DialogCustomer headerTitle="Cadastrar novo cliente">
              <ButtonDashboard variant="secondary">
                Cadastrar novo produtor
              </ButtonDashboard>
            </DialogCustomer>
          </div>
        </div>
        <ListCustomer />
      </div>
    </div>
  );
};

export default Customers;
