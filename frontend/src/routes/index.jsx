import { BrowserRouter as Router, Routes, Route } from "react-router";
import Login from "@/pages/login";
import { PrivaRoute } from "./privateRoutes";
import Dashboard from "@/pages/dashboard";
import Certificate from "@/pages/certificate";
import Customers from "@/pages/customers";
import Birds from "@/pages/birds";
import CertificateList from "@/pages/certificateslist";
import CertificatePage from "@/pages/certificate-form";
import GenerateGTA from "@/pages/generateGTA";

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route element={<PrivaRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/certificate/:id" element={<Certificate />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/birds" element={<Birds />} />
          <Route path="/certificates" element={<CertificateList />} />
          <Route path="/form/:id" element={<CertificatePage />} />
          <Route path="/animal-transit-guides/new" element={<GenerateGTA />} />
        </Route>
      </Routes>
    </Router>
  );
};
