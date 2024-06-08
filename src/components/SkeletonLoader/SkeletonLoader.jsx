import Skeleton from "@mui/material/Skeleton";

export default function SkeletonLoader() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0px",
        width: "18%",
        margin: "0px",
        justifyContent: "start",
        alignItems: "start",
        "@media (max-width: 620px)": {
          width: "90%", // Cambia el ancho a 100% cuando el ancho de la pantalla sea igual o menor a 600px
        },
      }}
    >
      <div style={{ width: "100%", padding: "0px", height: "300px" }}>
        <Skeleton
          sx={{ width: "100%", height: "100%", backgroundColor: "#b0b0b0" }}
        ></Skeleton>
      </div>
      <div style={{ width: "100%", padding: "0px", height: "100px" }}>
        <Skeleton
          sx={{ width: "100%", height: "100%", backgroundColor: "#b0b0b0" }}
        ></Skeleton>
      </div>
      {/* <div style={{ width: "100%", padding: "0px", height: "300px" }}>
                <Skeleton sx={{ width: "100%", height: "100%", backgroundColor: "#b0b0b0" }}></Skeleton>

            </div> */}
    </div>
  );
}
