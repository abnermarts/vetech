import CustomersPage from "./Table";
("@/components/Table");

const UserSelect = ({ idCertificate }) => {
  return (
    <div className="flex flex-col justify-start items-center w-full h-lvh flex-1">
      <div className="w-full h-full flex flex-col justify-center items-center gap-4 pt-4">
        <p className="text-sm">#{idCertificate}</p>
        <h2 className="font-medium text-lg">
          Selecione os produtores que será gerado o atestado de saúde.
        </h2>
        <p className="w-[500px] text-center text-[14px] text-[#787878]">
          Para selecionar, clique no checkbox relacionado <br /> do cliente e
          após isso em "avançar".
        </p>
        <div className="flex flex-col w-[50%] justify-center content-center items-center">
          <CustomersPage />
        </div>
      </div>
    </div>
  );
};

export default UserSelect;
