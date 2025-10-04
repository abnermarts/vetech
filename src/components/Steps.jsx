const Steps = ({ step = "1", name = "Produtores", status = "active" }) => {
  const getClassStatus = () => {
    if (status == "active") {
      return "bg-black text-white border-none";
    }

    if (status == "inactive") {
      return "bg-white text-[#929292] border-1 border-[#D8D8D8]";
    }
  };

  return (
    <div className="flex flex-row gap-2 py-2 items-center">
      <span
        className={`${getClassStatus()} rounded-[8px] text-[12px] flex flex-col justify-center items-center w-[22px]  transition ease-linear duration-300`}
      >
        {step}
      </span>
      <p className="font-medium text-[14px]">{name}</p>
    </div>
  );
};

export default Steps;
