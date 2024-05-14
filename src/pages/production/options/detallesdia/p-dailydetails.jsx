import { Alert, Button, CircularProgress } from "@mui/material";
import "./p-dailydetails.css";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import DeleteIcon from "@mui/icons-material/Delete";
import { Productlist } from "../../../../components/productlist/product-list";
import FastRewindIcon from '@mui/icons-material/FastRewind';
import dayjs from "dayjs";
import { useRef } from "react";
import Table from "../../../../components/Table/Table";
import { useGetinforme } from "../../../../components/hooks/admins/use-get-informe";
import { useEffect } from "react";
import { Menuheader } from "../../../../components/menuheader";

//import { useProductions } from "../../../../components/hooks/use-get-productions";
//import { useIngresos } from "../../../../components/hooks/ingreso/use-get-ingresos";

import { useNavigate } from 'react-router-dom';

export const Dailydetails = () => {
  const informemutation = useGetinforme();
  //const egresosf = useProductions();
  //const ingresosf = useIngresos();
  const now = dayjs();
  const today = dayjs(now.subtract(3, "hour"));
  const tomorrow = today.add(1, "day");
  let desderef = useRef(today);
  let hastaref = useRef(tomorrow.subtract(3, "hour"));

  useEffect(() => {
    handleBuscar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let navigate = useNavigate();



  const handleBuscar = () => {
    let fechasdata = [
      desderef.current.format("MM-DD-YYYY"),
      hastaref.current.format("MM-DD-YYYY"),
    ];

    informemutation.mutate(fechasdata);
  };

  return (
    <div className="admprodcontainer">
      <Menuheader />
      <div className="a-p-content">
        <span style={{ fontStyle: "italic", fontWeight: "500", fontSize: "20px", opacity: "80%", marginTop: "8px" }}>{now.format("DD [de] MMMM [de] YYYY")}</span>
        <div className="cont-inform">

          <FastRewindIcon onClick={() => navigate("/productionmenu")} sx={{ fontSize: "28px", fontWeight: "bold", padding: "10px", cursor: "pointer", boxSizing: "content-box", margin: "15px", borderRadius: "50%", bgcolor: "#f3a406" }} />
          <h1>Informe</h1>
        </div>

        <div>
          {informemutation.isSuccess ? (
            <div>
              <h2 style={{padding:"10px"}}>Ingresos</h2>
              <Table array={informemutation.data.ingresos}></Table>
              <h2 style={{padding:"10px"}}>Egresos</h2>
              <Table array={informemutation.data.egresos}></Table>
              {/* <div className="listadeprod">
                <label className="listlabel">Ingresos</label>
                <Productlist
                  datos={informemutation.data.ingresos}
                  estado="ingreso"
                />
              </div>
              <div className="listadeprod">
                <label className="listlabel">Egresos</label>
                <Productlist
                  datos={informemutation.data.egresos}
                  estado="egreso"
                />
              </div> */}
              <div className="div-delet-bajas">
                <div className="div-btns-inform">
                  <DeleteIcon sx={{fontSize:"22px",color:"#f3a406", fontWeight:"bold"}}/>
                  <label className="">
                    Desechos: {informemutation.data.desechos}
                  </label>
                </div>
                <div className="div-btns-inform">
                  <LocalHospitalIcon sx={{fontSize:"22px",color:"#f3a406", fontWeight:"bold"}}/>
                  <label className="">
                    Bajas: {informemutation.data.bajas}
                  </label>
                </div>
              </div>
            </div>
          ) : informemutation.isPending ? (
            <div>
              <Alert severity="info">Cargando datos...</Alert>
              <CircularProgress />
            </div>
          ) : informemutation.isError ? (
            <Alert severity="error">{informemutation.error.message}</Alert>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
};
