import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";
import { Outlet } from "react-router";
import { Navigate } from "react-router";

export const PrivaRoute = () => {
  const { signed, loading } = useContext(AuthContext);
  
  if(loading){
    return <div>Carregando</div>
  }

  return signed ? <Outlet /> : <Navigate to="/"  />;
};
