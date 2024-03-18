import {
  Alert,
  Avatar,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
} from "@mui/material";
import { Menuheader } from "../../../../components/menuheader";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import NumbersIcon from "@mui/icons-material/Numbers";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import CategoryIcon from "@mui/icons-material/Category";
import "./adm-galpones.css";
import { useGalpones } from "../../../../components/hooks/use-galpones";
import { useRef, useState } from "react";
import { Loader } from "../../../login/loader";

export const Admgalponespage = () => {
  const [isopen, setIsopen] = useState(false);
  const actualgalpon = useRef({ id: 0, nombre: " ", enProduccion: 0 });
  const getgalpones = useGalpones();
  Loader("admin");

  const handleClose = () => {
    setIsopen(false);
  };

  return (
    <div id="admgalponescontainer">
      <Menuheader />
      <div id="admgalponescontent">
        <Button
          variant="outlined"
          startIcon={<NavigateBeforeIcon />}
          sx={{ display: "flex", flexDirection: "row", justifySelf: "left" }}
          onClick={() => (window.location.href = "/adminmenu")}
        >
          Volver
        </Button>
        <h1>Galpones</h1>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <div id="galponboxx">
            {getgalpones.status === "success" ? (
              getgalpones.data.map((objeto, key) => (
                <div
                  key={key}
                  className="galponoption"
                  onClick={() => {
                    actualgalpon.current = objeto;
                    setIsopen(true);
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "1vw",
                    }}
                  >
                    <p style={{ fontWeight: "bold" }}>{" > Nombre: "}</p>
                    <p>{objeto.nombre}</p>
                  </div>
                  <ArrowForwardIosIcon className="arrowgalpon" />
                </div>
              ))
            ) : getgalpones.status === "pending" ? (
              <div>
                <Alert severity="info">Cargando...</Alert>
                <CircularProgress />
              </div>
            ) : getgalpones.status === "error" ? (
              <Alert severity="error">Error al cargar datos</Alert>
            ) : (
              <div></div>
            )}
          </div>
        </div>

        <Dialog open={isopen} onClose={handleClose}>
          <DialogTitle>Detalles</DialogTitle>
          <Stack spacing={3} sx={{ mb: 3 }}>
            <List>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <NumbersIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="ID"
                  secondary={actualgalpon.current.id}
                />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <DriveFileRenameOutlineIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Nombre"
                  secondary={actualgalpon.current.nombre}
                />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <CategoryIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Cantidad en produccion"
                  secondary={actualgalpon.current.enProduccion}
                />
              </ListItem>
            </List>
          </Stack>
          <Button onClick={handleClose} variant="contained" color="warning">
            Cerrar
          </Button>
        </Dialog>
      </div>
    </div>
  );
};
