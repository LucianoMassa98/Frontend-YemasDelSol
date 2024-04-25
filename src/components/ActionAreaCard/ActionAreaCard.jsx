import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import CardMedia from '@mui/material/CardMedia';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function ActionAreaCard({ img, nombre, precio, setAddToCart }) {

    const [cantidad, setCantidad] = React.useState("1")
    const handleChange = (event) => {
        setCantidad(event.target.value);
    };
    const addToCart = () => {

        setAddToCart(prevCart => [...prevCart, { id: Date.now(), nombre, cnt: cantidad, precio }]);
    };
    return (
        <Card sx={{
            borderRadius: "15px",
            width: "30%", '@media (max-width: 620px)': {
                width: "90%",
            },
        }}>
            <CardActionArea sx={{ display: "flex" }}>
                <CardMedia
                    component="img"
                    height="210"
                    image={img}
                    sx={{
                        padding: "22px",
                        display: "flex",
                        borderRadius: "35px",
                        // backgroundColor: "red",

                        justifyContent: "center",
                        objectFit: "cover", // Controla cómo se ajusta la imagen dentro del contenedor
                        overflow: "hidden", // Controla el desbordamiento de la imagen
                    }} alt={nombre}

                />
                <CardContent sx={{ backgroundColor: "#E8E8E8", display: "flex", justifyContent: "start", padding: "20px" }}>
                    <Box sx={{ minWidth: 180, display: "flex", flexDirection: "column", alignItems: "start" }}>
                        <Typography gutterBottom variant="h5" component="div">
                            {nombre}
                        </Typography>

                        <TextField id="outlined-basic" label="Ingrese una cantidad" InputProps={{
                            sx: {
                                borderRadius: '80px', // Ajusta el valor según sea necesario
                                backgroundColor: 'white',
                                border: 'none'
                            },
                        }} variant="outlined" value={cantidad} onChange={handleChange} />
                        <Typography sx={{ color: "#0019F7" }} gutterBottom variant="h5" component="div">
                            ${precio}
                        </Typography>
                        <Button onClick={addToCart} sx={{
                            backgroundColor: "#FFA500", width: "100%", fontSize: "13px", '&:hover': {
                                backgroundColor: "#FFD100",
                            }
                        }} variant="contained">Agregar al carrito</Button>


                    </Box>

                </CardContent>
            </CardActionArea>

        </Card>
    );
}