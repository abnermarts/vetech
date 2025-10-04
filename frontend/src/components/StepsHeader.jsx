import Steps from "./Steps";

const StepsHeader = ({ currentStep }) => {
  return (
    <div className="bg-[#F3F3F3] flex flex-row w-full justify-center items-center gap-5 py-3">
      <Steps status={`${currentStep == 0 ? "active" : "inactive"}`} />
      <span className="bg-[#D8D8D8] pt-[1px] pl-6" />
      <Steps step="2" name="Animais" status={`${currentStep == 1 ? "active" : "inactive"}`} />
      <span className="bg-[#D8D8D8] pt-[1px] pl-6" />
      <Steps step="3" name="Atestados" status={`${currentStep == 2 ? "active" : "inactive"}`} />
    </div>
  );
};

export default StepsHeader;
