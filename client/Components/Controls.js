import React from "react";
import Box from "@mui/material/Box";

export const Controls = () => {
  return (
    <div>
      <Box
        component="div"
        sx={{ display: "flex", marginBottom: "25px", justifyContent: "center",marginTop:"25px" }}
      >
        <Box
          component="div"
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            flexDirection: "column",
          }}
        >
          <Box component="h2" sx={{ marginBottom: "4px", marginTop: "0px",marginLeft:"20px" }}>
            Left
          </Box>
          <Box
            component="img"
            src="wasd/computer_key_A.png"
            sx={{ height: "80px", width: "80px",marginLeft:"20px" }}
          />
        </Box>
        <Box
          component="div"
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            flexDirection: "column",
          }}
        >
          <Box component="h2" sx={{ marginBottom: "4px", marginTop: "0px",marginLeft:"20px" }}>
            Jump
          </Box>
        <Box
          component="img"
          src="wasd/computer_key_W.png"
          sx={{ height: "80px", width: "80px",marginLeft:"20px" }}
        />
        </Box>
        <Box
          component="div"
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            flexDirection: "column",
          }}
        >
          <Box component="h2" sx={{ marginBottom: "4px", marginTop: "0px",marginLeft:"20px" }}>
            Right
          </Box>
        <Box
          component="img"
          src="wasd/computer_key_D.png"
          sx={{ height: "80px", width: "80px", marginLeft: "20px" }}
        />
        </Box>
        <Box
          component="div"
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            flexDirection: "column",
          }}
        >
          <Box component="h2" sx={{ marginBottom: "4px", marginTop: "0px",marginLeft:"20px" }}>
            Jump
          </Box>
        <Box
          component="img"
          src="wasd/computer_key_Space_bar.png"
          sx={{ height: "80px", width: "400px", marginLeft: "20px" }}
        />
        </Box>
        <Box
          component="div"
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            flexDirection: "column",
          }}
        >
          <Box component="h2" sx={{ marginBottom: "4px", marginTop: "0px",marginLeft:"20px" }}>
            Accelerate
          </Box>
        <Box
          component="img"
          src="wasd/computer_key_Shift.png"
          sx={{ height: "80px", width: "190px", marginLeft: "20px" }}
        />
        </Box>
      </Box>
    </div>
  );
};
