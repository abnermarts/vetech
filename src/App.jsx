import { AppRouter } from "./routes";
import { AuthProvider } from "./context/AuthContext";
import { CertificateContext } from "@/context/CertificateContext";
import { useRef } from "react";

function App() {
  const getSonDataRef = useRef(null);

  return (
    <CertificateContext.Provider
      value={{
        registerGetDataFn: (fn) => (getSonDataRef.current = fn),
      }}
    >
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </CertificateContext.Provider>
  );
}

export default App;
