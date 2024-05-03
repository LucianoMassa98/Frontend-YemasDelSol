import * as React from 'react';
import "./ModalCheckout.css"
import { useState } from 'react';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import dayjs from 'dayjs';
import Fade from '@mui/material/Fade';
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Table from '../../../components/Table/Table';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  boxShadow: 24,
  color: "white",
  p: 2,

  bgcolor: '#6a6fbd',
  borderRadius: 3, // Agregar borde redondeado
  border: '1px solid #000',
};

export default function ModalCheckout({ openCheckout, handleCloseCheck, handleOpenCheck, addToCart, setAddToCart }) {
  const [generarPdf, setGenerarPdf] = useState(true)
  const handleChangePdf = () => {
    setGenerarPdf(!generarPdf)
  }
  console.log(addToCart, "esato es el add to cart");
  const nombre = "USUARIO"
  const cuenta = "00554547848745154"
  const handleSubmit = (e) => {
    e.preventDefault()
    if (generarPdf) {
      const today = dayjs().format('DD-MM-YYYY');

      const currentTime = dayjs().format('HH:mm:ss');

      const doc = new jsPDF()
      doc.text("Factura", 95, 20)
      doc.text(`Nombre:${nombre}`, 10, 30)
      doc.text(`Cuenta:${cuenta}`, 10, 41)
      doc.text(`Fecha:${today}`, 10, 51)
      doc.text(`Hora:${currentTime}`, 65, 51)
      const columns = ["id", "Producto", "Cantidad"]
      const rows = addToCart.map(item => [item.id, item.nombre, item.cnt]);
      doc.autoTable({
        startY: 56,
        head: [columns],
        body: rows
      })
      doc.save(`ticket_${nombre}.pdf`)
    }

  }

  return (
    <div>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openCheckout}
        onClose={handleCloseCheck}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openCheckout}>
          <Box sx={style}>
            <h3 className='span-checkout'>Checkout</h3>
            {/* <Button
              variant="contained"

              sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "start", height: "26px", justifySelf: "left" }}
              onClick={handleCloseCheck}
            >
              <NavigateBeforeIcon />
              Volver
            </Button> */}

            <Typography id="transition-modal-title" variant="h6" component="h2">
              Datos :  Cliente
            </Typography>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Nombres :  Pepe Reina
            </Typography>
            <form onSubmit={handleSubmit} action="">
              <div className='form-check'>
              {/* FUNCIONALIDAD PENSADA A FUTURO */}
                <label htmlFor="">Generar Ticket

                  <input type="checkbox" />
                </label>
              {/* ///////////////////////////////////////// */}
                <label htmlFor="">
                  Generar PDF
                  <input onChange={handleChangePdf} checked={generarPdf} type="checkbox" />
                </label>
              </div>
              <Typography sx={{ color: "black", marginTop: "5px" }} id="transition-modal-title" variant="h6" component="h2">
                Cargar Cobro
              </Typography>
              <div className='form-check-cobro'>
                <label htmlFor="">Cuenta

                  <input type="text" />
                </label>
                <label htmlFor="">
                  Monto
                  <input type="number" />
                </label>
                <div className='btns-add-delete'>
                  <span className='span-delete'>Eliminar cuenta</span>
                  <span>Agregar otra cuenta</span>
                </div>

              </div>
              <div className='total-sub'>

                <Typography sx={{ color: "black", marginTop: "6px" }} id="transition-modal-title" variant="h6" component="h2">
                  Total: $0000
                </Typography>
                <Typography sx={{ color: "white", marginTop: "2px" }} id="transition-modal-title" variant="h9" component="h5">
                  Subtotal : $0000
                </Typography>
              </div>
              <Table array={addToCart} setArrayResumen={setAddToCart} tableModal={"modal"} mostrarDelete={false}></Table>
              <div className='btns-ultimate'>
                <Button sx={{ color: "red", backgroundColor: "white", border: "1px solid black" }} onClick={handleCloseCheck} variant='outlined' color="error">Cancelar</Button>
                <Button type='submit' variant='contained' color="success">Confirmar</Button>
              </div>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
