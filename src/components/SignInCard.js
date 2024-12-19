import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MuiCard from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import GoogleIcon from "@mui/icons-material/Google";
import logo from "../images/rguktLogo.png";
import { handleUserLogin } from "../firebaseUtils/login";
import { toast } from "react-toastify";
const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

export default function SignInCard() {
  const handleLogin = async () => {
    try {
      await handleUserLogin();
    } catch (error) {
      toast.error("Failed to login");
    }
  };
  return (
    <>
      <Card variant="elevation">
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <img src={logo} alt="logo" />
        </Box>
        <Typography
          component="h1"
          variant="h5"
          sx={{
            width: "100%",
            fontSize: "clamp(2rem, 10vw, 2.15rem)",
            textAlign: "center",
          }}
        >
          Sign in
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Button
            fullWidth
            variant="contained"
            onClick={handleLogin}
            startIcon={<GoogleIcon />}
          >
            Sign in with Google
          </Button>
        </Box>
      </Card>
    </>
  );
}
