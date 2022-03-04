import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const NavBar = () => {
  return (
    <Box component="div" sx={{ backgroundColor: "black", height: "50px",display:"flex",justifyContent:"center", alignItems:"center" }}>

        <Box component="div" sx={{margin:"0px",marginTop:"10px"}}>
        <Typography
        variant="h5"
        color="white"
        align="center"
        fontFamily="Plumber"
      >
          SUPER MARIO BROS.
          </Typography>
        </Box>

    </Box>
  );
};
