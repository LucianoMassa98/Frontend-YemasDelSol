import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import "./Modal.css"
import Modal from '@mui/material/Modal';

import Collapse from '@mui/material/Collapse'; // Importa el componente Collapse

const style = {
  position: 'absolute',
  display: "flex",
  flexDirection: "column",
  gap: "25px",
  top: '50%',
  left: '80%',
  width: 300,
  transform: 'translate(-50%, -50%)',
  // width: 400,
  bgcolor: '#6a6fbd', // Cambiar a un tono de azul claro
  borderRadius: 3, // Agregar borde redondeado
  border: '0px solid #000',
  boxShadow: 24,
  color: "white",
  p: 4,
};


export default function ModalAddToCart({ handleClose, openModal }) {
  const [openCollapse, setOpenCollapse] = React.useState(false); // Estado para controlar la apertura del Collapse
  const today = dayjs().format('YYYY-MM-DD');
  return (
    <div className='div-modal'>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"

      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h1">
            Agregar al carrito
          </Typography>
          <form action="" className='form-modal'>
            <div>
              <label htmlFor="">Fecha</label>
              <span>{today}</span>
            </div>
            <div>
              <label htmlFor="">Vendedor</label>
              <span>Administrador</span>
            </div>
            <div>
              <label htmlFor="">Cliente</label>
              <select name="" id="">
                <option value="">
                  Cliente 1
                </option>
                <option value="">
                  Cliente 2
                </option>
                <option value="">
                  Cliente 3
                </option>
              </select>
            </div>
          </form>
          {/* <Button onClick={() => setOpenCollapse(!openCollapse)}>Toggle Collapse</Button> 
          <Collapse in={openCollapse} timeout="auto" unmountOnExit> 
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Collapse> */}
          <section className='section-mercaderia'>
            <span>Huevoo criollo</span>
            <span>HUevo Mediano</span>
            <span>Huevo grande</span>
            <span>HUevo de granja</span>

          </section>
          <div className='btn-next-modal'>


            <Button sx={{
              backgroundColor: "#0b167c", width: "100%", height: "40px", fontSize: "13px", '&:hover': {
                backgroundColor: "#0c1db9",
              }
            }} variant="contained">Siguiente</Button>
            <Button sx={{
              backgroundColor: "#a01313", color :"white",width: "100%", height: "40px", fontSize: "13px", '&:hover': {
                backgroundColor: "#720707",
              }
            }} variant="outlined" color="error">
              Cancelar
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
