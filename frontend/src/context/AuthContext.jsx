import { createContext, useEffect, useState } from "react";
import { api } from "@/services/api";
import { toast } from "sonner";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadingStorageData = async () => {
      const storageUser = localStorage.getItem("User");
      const storageToken = localStorage.getItem("Token");

      if (storageToken && storageUser) {
        api.defaults.headers.common["Authorization"] = `Bearer ${storageToken}`;
        setUser(JSON.parse(storageUser));
      }
      setLoading(false);
    };
    loadingStorageData();
  }, []);

  const SignIn = async ({ user, password }) => {
    try {
      const response = await api.post("/session", { user, password });
      setUser(response.data);
      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token.accessToken}`;
      localStorage.setItem("Token", response.data.token.accessToken);
      localStorage.setItem("RefreshToken", response.data.token.refreshToken);
      localStorage.setItem("User", JSON.stringify(response.data));
    } catch (err) {
      console.error("Token inválido ou expirado");
      localStorage.removeItem("Token");
      localStorage.removeItem("User");
      setUser(null);
      toast.error("Erro ao fazer login. Verifique suas credenciais");
      console.error(err);
    }
  };

  const SignOut = () => {
    setUser(null);
    localStorage.removeItem("Token");
    localStorage.removeItem("User");
    localStorage.removeItem("RefreshToken");
    delete api.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider
      value={{ user, signed: !!user, loading, SignIn, SignOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};
