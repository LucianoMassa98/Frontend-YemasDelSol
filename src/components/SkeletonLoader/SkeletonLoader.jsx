import React from 'react'
import { Card, Skeleton, CardContent } from '@mui/material'


export default function SkeletonLoader() {
    return (
        <div style={{

            display: "flex",
            gap: "5px",
            alignItems: "start",
            justifyContent: "center",
            width: "30%",

            '@media (max-width: 620px)': {
                width: "90%", // Cambia el ancho a 100% cuando el ancho de la pantalla sea igual o menor a 600px
            },
        }}>

            <div style={{ width: "40%", padding: "0px", height: "180px" }}>
                <Skeleton sx={{ width: "100%", height: "100%", backgroundColor: "#b0b0b0" }}></Skeleton>

            </div>
            <div style={{ width: "60%", padding: "0px", height: "180px" }}>
                <Skeleton sx={{ width: "100%", height: "100%", backgroundColor: "#b0b0b0" }}></Skeleton>

            </div>
        </div>


    )
}
