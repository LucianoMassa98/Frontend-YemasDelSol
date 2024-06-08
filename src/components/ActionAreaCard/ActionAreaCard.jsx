import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import CardMedia from "@mui/material/CardMedia";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export default function ActionAreaCard({ img, nombre, precio, setAddToCart }) {
  const [cantidad, setCantidad] = React.useState("1");
  const handleChange = (event) => {
    setCantidad(event.target.value);
  };
  const addToCart = () => {
    setAddToCart((prevCart) => [
      ...prevCart,
      { id: Date.now(), nombre, cnt: cantidad, precio },
    ]);
  };
  return (
    <Card
      sx={{
        borderRadius: "10px",
        width: "18%",
        "@media (max-width: 620px)": {
          width: "90%",
        },
        boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.4)",
        marginY: "15px",
      }}
    >
      <CardActionArea sx={{ display: "flex", flexDirection: "column" }}>
        <CardMedia
          component="img"
          height="180"
          image={img}
          sx={{
            paddingTop: "11px",
            backgroundColor: "#F7A600",
            display: "flex",
            borderRadius: "0px",

            justifyContent: "center",
            objectFit: "cover",
            overflow: "hidden",
          }}
          alt={nombre}
        />
        <CardContent
          sx={{
            backgroundColor: "white",
            display: "flex",
            justifyContent: "start",
            padding: "20px",
          }}
        >
          <Box
            sx={{
              minWidth: 180,
              display: "flex",
              flexDirection: "column",
              gap: "15px",
              alignItems: "start",
            }}
          >
            <Typography
              gutterBottom
              variant="h5"
              sx={{ fontWeight: "bold" }}
              component="div"
            >
              {nombre}
            </Typography>

            <Typography
              sx={{ color: "#0019F7" }}
              gutterBottom
              variant="h5"
              component="div"
            >
              ${precio}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: "0px",
                alignItems: "center",
                width: "100%",
              }}
            >
              <span style={{ width: "65%" }}>Cantidad :</span>
              <TextField
                type="number"
                size="small"
                id="outlined-basic"
                label=""
                InputProps={{
                  sx: {
                    width: "80%",
                    backgroundColor: "white",
                    border: "none",
                  },
                }}
                variant="outlined"
                value={cantidad}
                onChange={handleChange}
              />
            </Box>
            <Button
              onClick={addToCart}
              startIcon={<ShoppingCartOutlinedIcon />}
              variant="contained"
              sx={{
                backgroundColor: "#FFA500",
                width: "100%",
                fontSize: "13px",
                "&:hover": {
                  backgroundColor: "#FFD100",
                },
                color: "black",
                fontWeight: "700",
              }}
            >
              Agregar al carrito
            </Button>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
