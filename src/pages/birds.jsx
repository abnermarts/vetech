import Header from "@/components/Header";
import DemoPage from "@/components/Table";
import BreadcrumbComponent from "@/components/Breadcrumb";
import DialogCustomer from "@/components/DialogSheetCustomer";
import ButtonDashboard from "@/components/ButtonDashboard";
import Maintenence from "@/components/Maintenece";

const Birds = () => {
  return (
    <div className="bg-[#F2F2F2] h-full min-h-screen flex flex-col ">
      <Header />
      <div className="flex flex-col w-auto items-center mx-12 my-4 py-4 bg-white rounded-lg">
        <div className="w-[95%]">
          <BreadcrumbComponent page="Pássaros" />
          <div className="flex flex-row justify-between">
            <div className="flex flex-col">
              <h2 className="font-medium text-[1.5rem] cursor-default">
                Pássaros
              </h2>
              <p className="text-[#797979] font-regular text-[0.9rem] cursor-default pb-3">
                Cadastre, exclua e edite os pássaros de seus produtores.
              </p>
              <Maintenence />
            </div>
            <DialogCustomer headerTitle="Cadastrar novo cliente">
              <ButtonDashboard variant="secondary">
                Cadastrar novo cliente
              </ButtonDashboard>
            </DialogCustomer>
          </div>
        </div>
        <DemoPage />
      </div>
    </div>
  );
};

export default Birds;
