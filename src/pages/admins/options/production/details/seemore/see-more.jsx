import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Productlist } from "../../../../../../components/productlist/product-list";
import dayjs from "dayjs";

export const Vermasdialog = ({ open, onClose, objeto, tipo }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Datos Generales</DialogTitle>
      <DialogContent dividers>
        <List disablePadding>
          <ListItem disableGutters disablePadding>
            <ListItemText
              primary="Fecha:"
              secondary={`${dayjs(objeto.createdAt).format("DD/MM/YYYY")}`}
            />
          </ListItem>
          <ListItem disableGutters disablePadding>
            <ListItemText
              primary="Operador:"
              secondary={`${objeto?.user?.customer?.nombre} - ${objeto?.user?.customer?.apellido}`}
            />
          </ListItem>
          <ListItem disableGutters disablePadding>
            {objeto?.galpon != null ? (
              <ListItemText
                primary="Galpon:"
                secondary={`${objeto?.galpon?.nombre}`}
              />
            ) : (
              <ListItemText
                primary="Galpon: No definido"
                secondary="Carga en progreso"
              />
            )}
          </ListItem>
          <ListItem>
            <Productlist datos={objeto.items} estado={tipo} />
          </ListItem>
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
};
