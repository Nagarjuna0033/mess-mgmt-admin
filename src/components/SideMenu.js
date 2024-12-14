import * as React from "react";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import MuiDrawer, { drawerClasses } from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import MenuContent from "./MenuContent";
import OptionsMenu from "./OptionsMenu";
import { auth } from "../firebaseUtils/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
const drawerWidth = 240;
const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: "border-box",
  mt: 10,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: "border-box",
  },
});

export default function SideMenu() {
  const [userDetails, setUserDetails] = React.useState({
    displayName: "user",
    email: "user@gmail.com",
    photoURL: "/static/images/avatar/7.jpg",
  });
  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user) {
        setUserDetails({
          displayName: user.displayName || "user",
          email: user.email || "user@gmail.com",
          photoURL: user.photoURL,
        });
      } else {
        setUserDetails({
          displayName: "user",
          email: "user@gmail.com",
          photoURL: "/static/images/avatar/7.jpg",
        });
      }
    });

    return () => unsubscribe();
  }, []);
  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: "none", md: "block" },
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: "background.paper",
        },
      }}
    >
      <Stack
        direction="column"
        sx={{ justifyContent: "center", alignItems: "center", mb: 1, mt: 2 }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Mess Management
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Admin
        </Typography>
      </Stack>
      <Divider />

      <MenuContent />

      <Stack
        direction="row"
        sx={{
          p: 2,
          gap: 1,
          alignItems: "center",
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <Avatar
          sizes="small"
          alt="Riley Carter"
          src={userDetails.photoURL}
          sx={{ width: 36, height: 36 }}
        />
        <Box sx={{ mr: "auto" }}>
          <Typography
            variant="body2"
            sx={{ fontWeight: 500, lineHeight: "16px" }}
          >
            {userDetails.displayName}
          </Typography>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            {userDetails.email}
          </Typography>
        </Box>
        <OptionsMenu />
      </Stack>
    </Drawer>
  );
}
