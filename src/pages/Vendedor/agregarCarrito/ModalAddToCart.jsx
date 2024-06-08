import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import Backdrop from "@mui/material/Backdrop";
import { useSpring, animated } from "@react-spring/web";
import "./Modal.css";
import Modal from "@mui/material/Modal";
import Table from "../../../components/Table/Table";
import ModalCheckout from "../checkout/Modalheckout";
//import Collapse from '@mui/material/Collapse'; // Importa el componente Collapse
const Fade = React.forwardRef(function Fade(props, ref) {
  const { children, in: open, onClick, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {React.cloneElement(children, { onClick })}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element.isRequired,
  in: PropTypes.bool,
  onClick: PropTypes.any,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
  ownerState: PropTypes.any,
};
const style = {
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  top: "50%",
  left: "85%",
  width: 320,

  transform: "translate(-50%, -50%)",
  // width: 400,
  bgcolor: "#6a6fbd",
  borderRadius: 3, // Agregar borde redondeado
  border: "1px solid #000",
  boxShadow: 24,
  color: "white",
  p: 3,
};

export default function ModalAddToCart({
  handleClose,
  openModal,
  addToCart,
  setAddToCart,
}) {
  const [openCheckout, setOpenCheckout] = React.useState(false);
  const handleOpenCheck = () => setOpenCheckout(true);
  const handleCloseCheck = () => setOpenCheckout(false);

  // const [array, setArray] = useState([{
  //   id: 1,
  //   nombre: "Producto 1",
  //   cnt: 12
  // },
  // {
  //   id: 2,
  //   nombre: "prod 2",
  //   cnt: 10
  // }, {
  //   id: 3,
  //   nombre: "Producto 1",
  //   cnt: 12
  // }, {
  //   id: 4,
  //   nombre: "Producto 1",
  //   cnt: 12
  // }, {
  //   id: 5,
  //   nombre: "Producto 1",
  //   cnt: 12
  // }, {
  //   id: 6,
  //   nombre: "Producto 1",
  //   cnt: 12
  // },])

  const today = dayjs().format("YYYY-MM-DD");
  return (
    <div className="div-modal">
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            TransitionComponent: Fade,
          },
        }}
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h1">
            Agregar al carrito
          </Typography>
          <form action="" className="form-modal">
            <div className="fech-vend">
              <label htmlFor="">Fecha : </label>
              <span>{today}</span>
            </div>
            <div className="fech-vend">
              <label htmlFor="">Vendedor : </label>
              <span>Administrador</span>
            </div>
            <div className="sel">
              <label htmlFor="">Cliente</label>
              <select name="" id="">
                <option value="">Cliente 1</option>
                <option value="">Cliente 2</option>
                <option value="">Cliente 3</option>
              </select>
            </div>
          </form>

          <Table
            array={addToCart}
            setArrayResumen={setAddToCart}
            tableModal={"modal"}
          ></Table>

          <div className="btn-next-modal">
            <Button
              onClick={handleOpenCheck}
              sx={{
                backgroundColor: "#0b167c",
                width: "100%",
                height: "40px",
                fontSize: "13px",
                "&:hover": {
                  backgroundColor: "#0c1db9",
                },
              }}
              variant="contained"
            >
              Siguiente
            </Button>
            <Button
              onClick={handleClose}
              sx={{
                backgroundColor: "#a01313",
                color: "white",
                width: "100%",
                height: "40px",
                fontSize: "13px",
                "&:hover": {
                  backgroundColor: "#720707",
                },
              }}
              variant="outlined"
              color="error"
            >
              Cancelar
            </Button>
          </div>
        </Box>
      </Modal>
      <ModalCheckout
        handleOpenCheck={handleOpenCheck}
        addToCart={addToCart}
        setAddToCart={setAddToCart}
        handleCloseCheck={handleCloseCheck}
        openCheckout={openCheckout}
      ></ModalCheckout>
    </div>
  );
}
