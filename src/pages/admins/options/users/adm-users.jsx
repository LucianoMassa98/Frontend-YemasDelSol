import { Alert, Button, CircularProgress } from "@mui/material";
import { Menuheader } from "../../../../components/menuheader";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "./adm-users.css";
import { useGetallusers } from "../../../../components/hooks/admins/use-get-users";

export const Admuserspage = () => {
  const users = useGetallusers();
  if (users.isSuccess) {
    console.log(users.data, "datos de usuario");
  }
  return (
    <div id="admuserscontainer">
      <Menuheader />
      <div id="admuserscontent">
        <Button
          variant="outlined"
          startIcon={<NavigateBeforeIcon />}
          sx={{ display: "flex", flexDirection: "row", justifySelf: "left" }}
          onClick={() => (window.location.href = "/adminmenu")}
        >
          Volver
        </Button>
        <h1>Usuarios</h1>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
          }}
        >
          <div id="usersboxx">
            {users.status === "success" ? (
              users.data.map((objeto, key) => (
                <div key={key} className="useroption">
                  <p>
                    {"Usuario: "}
                    {objeto.userName} {" -- email: "} {objeto.customer.email}{" "}
                  </p>
                  <ArrowForwardIosIcon className="arrowuser" />
                </div>
              ))
            ) : users.status === "pending" ? (
              <div>
                <Alert severity="info">Cargando...</Alert>
                <CircularProgress />
              </div>
            ) : users.status === "error" ? (
              <Alert severity="error">Error al cargar datos</Alert>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
