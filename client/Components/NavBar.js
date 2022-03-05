import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const NavBar = () => {
  return (
    <Box component="div" sx={{ zIndex:2, backgroundColor: "black", height: "100px",display:"flex",justifyContent:"center", alignItems:"center", }}>

        <Box component="div" sx={{marginTop:"20px", marginTop:"20px"}}>
        <Typography
        variant="h3"
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
