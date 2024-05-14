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
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Menuheader } from "../../../../components/menuheader";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import NumbersIcon from "@mui/icons-material/Numbers";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import CategoryIcon from "@mui/icons-material/Category";
import "./adm-galpones.css";
import { useGalpones } from "../../../../components/hooks/use-galpones";
import { useRef, useState } from "react";
import { useStore } from "../../../../store/use-store";
import { useNavigate } from 'react-router-dom';

export const Admgalponespage = () => {
  const [edit, setEdit] = useState(false)
  const [editProd, setEditProd] = useState(false)
  const [isopen, setIsopen] = useState(false);
  const actualgalpon = useRef({ id: 0, nombre: " ", enProduccion: 0 });
  const getgalpones = useGalpones();

  const loggedUser = useStore((state) => state.user);

  const navigate = useNavigate();

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
 
    p: 4,
    '@media (max-width: 600px)': {
      width: '90%', // Cambiar el ancho del elemento cuando el ancho de la pantalla es menor o igual a 600px
    }

  };
  const abrirEditor = () => {
    setEdit(true)

  }
  const abrirEditorProd = () => {
    setEditProd(true)
  }
  const handleClose = () => {
    setIsopen(false);


  };
  const handleCloseDos = () => {

    setEdit(false)
    setEditProd(false)

  };
  console.log(getgalpones, "getgalpones");

  return (
    <div id="admgalponescontainer">
      <Menuheader />
      <div id="admgalponescontent">
        <Button
          variant="outlined"
          startIcon={<NavigateBeforeIcon />}
          sx={{ display: "flex", flexDirection: "row", justifySelf: "left" }}
          onClick={() => navigate("/adminmenu")}
        >
          Volver
        </Button>
        <h1>Galpones {loggedUser?.userName}!</h1>
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
          <Stack spacing={3} sx={{
            mb: 3, width: "40vw", '@media screen and (max-width: 768px)': {
              width: "80vw", // Cambia el ancho del Stack cuando el ancho de la pantalla sea menor o igual a 768px
            }
          }}>
            <List>
              <ListItem sx={{ borderBottom: "1px solid black" ,borderTop: "1px solid black"  }}>
                <ListItemAvatar>
                  <Avatar>
                    <NumbersIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="ID"
                  secondary={actualgalpon.current.id}
                />

              </ListItem >
              <ListItem sx={{ borderBottom: "1px solid black" ,borderTop: "1px solid black"  }}>
                <ListItemAvatar>
                  <Avatar>
                    <DriveFileRenameOutlineIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Nombre"
                  secondary={actualgalpon.current.nombre}
                />
                <Button onClick={abrirEditor} sx={{ margin: "10px 20px 0px 20px" }} variant="contained" color="primary">
                  Editar
                </Button>
              </ListItem>
              <ListItem sx={{ borderBottom: "1px solid black" ,borderTop: "1px solid black"  }}>
                <ListItemAvatar>
                  <Avatar>
                    <CategoryIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Cantidad en produccion"
                  secondary={actualgalpon.current.enProduccion}
                />
                <Button onClick={abrirEditorProd} sx={{ margin: "10px 20px 0px 20px" }} variant="contained" color="primary">
                  Editar
                </Button>
              </ListItem>
            </List>
          </Stack>


          {/* ESTE MODAL EDITA EL NOMBDE DEL GALPON */}
          <Modal
            open={edit}
            onClose={handleCloseDos}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Editar el nombre del galpon
              </Typography>
              <form className="campos">
                <div className="name-actual">

                  <Typography id="modal-modal-description" sx={{ fontSize: "15px" }}>
                    Nombre actual :
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ fontSize: "16px", fontWeight: "600" }}>
                    {actualgalpon.current.nombre}
                  </Typography>

                </div>
                <div className="name-new">
                  <label htmlFor="">Nombre nuevo</label>

                  <input type="text" required />
                </div>
                <Button variant="contained" type="submit">Guardar cambios</Button>
              </form>

            </Box>
          </Modal>


          {/* ESTE MODAL EDITA LA PRODUCCION */}
          <Modal
            open={editProd}
            onClose={handleCloseDos}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>

              <Typography id="modal-modal-title" variant="h6" component="h2">
                Editar en produccion del galpon
              </Typography>
              <form className="campos">
                <div className="name-actual">

                  <Typography id="modal-modal-description" sx={{ fontSize: "15px" }}>
                    En produccion actual :
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ fontSize: "16px", fontWeight: "600" }}>
                    {actualgalpon.current.enProduccion}
                  </Typography>

                </div>
                <div className="name-new-dos">
                  <label htmlFor="">Nueva Produccion:</label>

                  <input type="number" required />
                </div>
                <Button variant="contained" type="submit">Guardar cambios</Button>
              </form>


            </Box>
          </Modal>


          <Button onClick={handleClose} sx={{ margin: "10px 20px 10px 20px" }} variant="contained" color="warning">
            Cerrar
          </Button>

        </Dialog>




      </div>
    </div>
  );
};
