const ButtonDashboard = ({
  children,
  variant = "default",
  onClick,
  disabled,
}) => {
  const ButtonTypes = () => {
    if (variant == "default") {
      return "bg-black/30 backdrop-blur-sm w-fit cursor-pointer text-[0.8rem] gap-2 px-8 py-4 text-white border-white/20 hover:bg-black/70";
    }
    if (variant == "secondary") {
      return "bg-black px-4 text-[0.8rem] w-fit cursor-pointer py-2 gap-2 text-white border-white/20 hover:bg-black/90";
    }
    if (variant == "three") {
      return "bg-white px-4 text-[0.8rem] w-fit cursor-pointer py-2 gap-2 text-black border border-solid border-[#272727] hover:bg-[#E5E5E5]";
    }
    if (variant == "tag") {
      return "bg-white px-2 py-1 w-[95px] cursor-pointer gap-2 text-black text-[12px] border border-solid border-[#d2d2d2] hover:bg-[#E5E5E5]";
    }
    if (variant == "tag-error") {
      return "bg-[#fbe5e59e] px-2 w-[95px] gap-1 py-1 text-[#692626] text-[12px] border border-solid border-[#e4a2a2]";
    }
  };

  return (
    <div
      onClick={disabled ? undefined : onClick}
      className={`flex flex-row rounded-lg font-medium border  transition ease-linear duration-300 justify-center items-center ${ButtonTypes()} ${
        disabled ? "opacity-90 cursor-not-allowed pointer-events-none" : ""
      }`}
      aria-disabled={disabled}
    >
      {children}
    </div>
  );
};

export default ButtonDashboard;
