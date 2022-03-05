import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

const theme = createTheme({
  palette: {
    primary: {
      light: "#FFFFFF",
      main: "#EDF2FB",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 200,
      md: 1040,
      lg: 1200,
      xl: 1536,
    },
  },
});

function Copyright() {
  return (
    <Box
      component={"div"}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Link color="inherit" href="https://www.linkedin.com/in/nicolas-baez/">
        <LinkedInIcon fontSize="large" style={{ color: "white", marginRight:"10" }} />
      </Link>
      <Link color="inherit" href="https://github.com/Nick-qsv">
        <GitHubIcon fontSize="large" style={{ color: "white" }} />
      </Link>
    </Box>
  );
}

export const Footer = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          bgcolor: "black",
          p: 3,
          marginTop: "auto",
          borderTop: "ridge 1px gray",
          position: "relative",
        }}
        component="footer"
      >
        <Box
          component="img"
          src="https://i.postimg.cc/525Lfjnz/1-18.jpg"
          sx={{
            display: { xs: "none", sm: "none", md: "flex" },
            height: "95px",
            width: "340px",
            position: "absolute",
            bottom: "30px",
            left: "60px",
          }}
        />
        <Typography
          variant="h4"
          align="center"
          color="white"
          component="p"
          fontFamily="Plumber"
          letterSpacing=".1rem"
          marginTop="10px"
        >
          NICOLAS BAEZ
        </Typography>
        <Copyright />
      </Box>
    </ThemeProvider>
  );
};
