import CertificateCard from "./CertificateCard";

const Certificate = () => {
  return (
    <div className="flex flex-row w-full">
      <div>
        <div className="flex flex-row justify-between mb-2 ">
          <h2 className="font-medium cursor-default">Atestados de Saúde</h2>
          <a className="text-[0.8rem] text-[#797979] items-center justify-center cursor-pointer underline">
            Visualizar todos
          </a>
        </div>
        <div className="flex flex-col gap-3">
          <CertificateCard variant="success"/>
          <CertificateCard variant="alert"/>
          <CertificateCard />
          <CertificateCard />
          <CertificateCard />
        </div>
      </div>
    </div>
  );
};

export default Certificate;
