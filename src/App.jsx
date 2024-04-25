import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./libs/tanstack-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import "./App.css";
import { Loginpage } from "./pages/login/login-page";
import Register from "./pages/register/Register";
import { Productionmenu } from "./pages/production/production-menu";
import { Adminmenu } from "./pages/admins/admin-menu";
import { Ingreso } from "./pages/production/options/ingresos/ingreso";
import { AdmProduction } from "./pages/admins/options/production/adm-production";
import { Egreso } from "./pages/production/options/egresos/egreso";
import { AdmProductionDetails } from "./pages/admins/options/production/details/adm-production-details";
import { Admuserspage } from "./pages/admins/options/users/adm-users";
import { Admgalponespage } from "./pages/admins/options/galpones/adm-galpones";
import { Admnewuserpage } from "./pages/admins/options/users/newuser/adm-new-user";
import { Logoff } from "./components/logoff/log-off";
import { Productiondesechos } from "./pages/production/options/desechos/p-desechos";
import { Productionbajas } from "./pages/production/options/bajas/p-bajas";
import { Dailydetails } from "./pages/production/options/detallesdia/p-dailydetails";
import HomeVendedor from "./pages/Vendedor/homeVendedor/HomeVendedor";




function App() {
  return (
    <HelmetProvider>
      <Helmet titleTemplate="%s | Yemas Del Sol" defaultTitle="Yemas Del Sol" />

      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Logoff />} />
            <Route path="/login" element={<Loginpage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/productionmenu" element={<Productionmenu />} />
            <Route path="/adminmenu" element={<Adminmenu />} />
            <Route path="/adminmenu/production" element={<AdmProduction />} />
            <Route
              path="/adminmenu/production/details"
              element={<AdmProductionDetails />}
            />
            <Route path="/adminmenu/users" element={<Admuserspage />} />
            <Route
              path="/adminmenu/users/newuser"
              element={<Admnewuserpage />}
            />
            <Route path="/adminmenu/galpones" element={<Admgalponespage />} />
            <Route path="/productionmenu/ingreso" element={<Ingreso />} />
            <Route path="/productionmenu/egreso" element={<Egreso />} />
            <Route
              path="/productionmenu/desechos"
              element={<Productiondesechos />}
            />
            <Route path="/productionmenu/bajas" element={<Productionbajas />} />
            <Route
              path="/productionmenu/verdetallesdeldia"
              element={<Dailydetails />}
            />
            {/* VENDEDOR */}
            <Route path="/vendedor" element={<HomeVendedor/>} />
  
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
