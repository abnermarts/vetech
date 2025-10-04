import { Input } from "./ui/input";
import { Label } from "./ui/label";

const InputCustomize = ({ children, ...rest }) => {
  return (
    <div className="grid w-full max-w items-center gap-1.5">
      <Label className={children}>{children}</Label>
      <Input {...rest} />
    </div>
  );
};

export default InputCustomize;
