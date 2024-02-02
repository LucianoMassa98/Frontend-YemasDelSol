import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./libs/tanstack-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import "./App.css";
import { Loginpage } from "./pages/login/login-page";
import { Productionmenu } from "./pages/production/production-menu";
import { Adminmenu } from "./pages/admins/admin-menu";
import { Ingreso } from "./pages/production/options/ingreso";

function App() {
  return (
    <HelmetProvider>
      <Helmet
        titleTemplate="%s | AConex - Boot & Calendar"
        defaultTitle="AConex - Boot & Calendar"
      />

      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Loginpage />} />
            <Route path="/productionmenu" element={<Productionmenu />} />
            <Route path="/adminmenu" element={<Adminmenu />} />
            <Route path="/productionmenu/ingreso" element={<Ingreso />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
