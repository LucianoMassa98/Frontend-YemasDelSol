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

export default function ActionAreaCard({img , nombre,precio  }) {
  const [cantidad ,setCantidad] = React.useState("1")
  const handleChange = (event) => {
    setCantidad(event.target.value); // Actualiza el estado con el valor del input
};
    return (
        <Card sx={{ width: "30%",  '@media (max-width: 620px)': {
            width: "90%", // Cambia el ancho a 100% cuando el ancho de la pantalla sea igual o menor a 600px
        }, }}>
            <CardActionArea sx={{ display: "flex" }}>
                <CardMedia
                    component="img"
                    height="140"
                    image={img} 
                    alt="green iguana"
                
                />
                <CardContent sx={{ backgroundColor: "#E8E8E8",display:"flex", justifyContent:"start",padding:"20px" } }>
                    <Box sx={{ minWidth: 180 , display:"flex" , flexDirection:"column" , alignItems:"start" }}>
                    <Typography gutterBottom variant="h5" component="div">
                        {nombre}
                    </Typography>
                    
                        <TextField id="outlined-basic" label="Ingrese una cantidad" variant="outlined" value={cantidad} onChange={handleChange} />
                            <Typography sx={{ color: "#0019F7" }} gutterBottom variant="h5" component="div">
                                {precio}
                            </Typography>
                            <Button sx={{
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