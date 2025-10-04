import Button from "@/components/Button";
import Slider from "@/components/Slider";
import Logo from "../assets/imgs/logo.svg?react";
import Logocomplete from "../assets/imgs/logocomplete.svg?react";
import LoaderIcon from "../assets/icons/loader-circle.svg?react";

import InputCustomize from "@/components/Input";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { Navigate } from "react-router";

const Login = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { SignIn, signed } = useContext(AuthContext);

  const handleLoginUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    await SignIn({ user, password });
    setLoading(false);
  };

  if (signed) {
    return <Navigate to="/dashboard" />;
  } else {
    return (
      <div className="flex flex-row h-screen w-full">
        <div className="flex flex-col w-[100%] bg-white">
          <Slider />
        </div>
        <div className="flex flex-col h-full w-full bg-white justify-center content-center items-center">
          <div className="flex flex-col w-[24rem] gap-12 justify-center items-center">
            <Logocomplete className="w-20 h-20" />
            <div className="flex flex-col w-full justify-center items-center">
              <h2 className="text-[2rem] font-bold">Bem-vindo</h2>
              <p className="text-[0.9rem] text-[#9C9C9C]">
                Insira seu usuário e senha para acessar a Vetech
              </p>
            </div>
            <form
              className="flex flex-col w-full justify-center items-center gap-5"
              onSubmit={handleLoginUser}
            >
              <InputCustomize
                htmlFor="text"
                type="text"
                placeholder="email@hotmail.com"
                value={user}
                onChange={(e) => setUser(e.target.value)}
              >
                Email*
              </InputCustomize>
              <InputCustomize
                htmlFor="password"
                type="password"
                placeholder="*******"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              >
                Senha*
              </InputCustomize>
              <Button
                type="submit"
                className="h-12 flex items-center justify-center w-full"
              >
                {loading ? (
                  <span className="flex w-full justify-center">
                    <LoaderIcon className="color-white animate-spin w-4 h-4" />
                  </span>
                ) : (
                  "Acessar"
                )}
              </Button>
            </form>
            <div className="flex flex-col w-full items-center justify-center content-center gap-0">
              <a className="text-[0.9rem] text-black items-center justify-center cursor-pointer">
                Precisa de ajuda para conectar?
              </a>
              <a
                href="https://wa.me/+5544998403597"
                target="_blank"
                className="text-[0.9rem] text-[#797979] items-center justify-center cursor-pointer"
              >
                Fale com a gente
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Login;
