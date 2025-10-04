const Button = ({ onClick, children, className = "", ...rest }) => {
  return (
    <button 
      onClick={onClick} 
      className={`bg-black text-white rounded-lg h-[2.5rem] text-[0.9rem] hover:bg-[#131313] transition ease-linear duration-300 cursor-pointer ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
