import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./libs/tanstack-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import './App.css';
import { Loginpage } from "./pages/login/login-page";
import { Productionmenu } from "./pages/production/production-menu";
import { Adminmenu } from "./pages/admins/admin-menu";
import { Ingreso } from "./pages/production/options/ingresos/ingreso";
import { AdmProduction } from "./pages/admins/options/production/adm-production";
import { Egreso } from "./pages/production/options/egresos/egreso";
import { AdmProductionDetails } from "./pages/admins/options/production/details/adm-production-details";

function App() {
  return (
    <HelmetProvider>
      <Helmet
        titleTemplate="%s | Yemas Del Sol"
        defaultTitle="Yemas Del Sol"
      />

      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Loginpage />} />
            <Route path="/productionmenu" element={<Productionmenu />} />
            <Route path="/adminmenu" element={<Adminmenu />} />
            <Route path="/adminmenu/production" element={<AdmProduction />} />
            <Route
              path="/adminmenu/production/details"
              element={<AdmProductionDetails />}
            />
            <Route path="/productionmenu/ingreso" element={<Ingreso />} />
            <Route path="/productionmenu/egreso" element={<Egreso />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
