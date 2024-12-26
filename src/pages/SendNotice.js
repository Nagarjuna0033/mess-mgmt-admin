import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Grid,
  Paper,
} from "@mui/material";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseUtils/firebaseConfig";
import { addAnnouncement } from "../api/putAnnouncement";
import { sendNotifications } from "../firebaseUtils/sendNotificatoins";
import axios from "axios";
import { getDesignation } from "../utils/getDesignation";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#6200ea",
    },
    background: {
      default: "#121212",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
});

const SendNotice = () => {
  const [user, setUser] = useState(null);
  const api = process.env.REACT_APP_GET_FCM_TOKENS;
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user && localStorage.getItem("details") === "true") {
      const noticeData = {
        title: e.target.title.value,
        description: e.target.description.value,
        name: user.displayName || "N/A",
        designation: getDesignation(user.email.split("@")[0]),
        time: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
        imageURL: user["photoURL"],
      };
      const res = await addAnnouncement(noticeData);
      if (res.success) {
        toast.success("Announcement Sent Successfully");
        const tokens = await axios.get(api);
        await sendNotifications({
          payload: {
            tokens: tokens.data.tokens,
            data: {
              navigate: "true",
              page: "feedback",
              title: noticeData.title,
              body: noticeData.description,
            },
          },
        });
      } else {
        toast.error("Announcement Sent Failed");
      }
    } else {
      toast.error("please update your profile to send announcements");
      console.log("No user is logged in.");
    }
  };

  if (!user) {
    return (
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm" sx={{ mt: 5 }}>
          <Typography variant="h6" align="center">
            Please log in to send a notice.
          </Typography>
        </Container>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom align="center">
            Send Announcement
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  label="Title"
                  variant="outlined"
                  name="title"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  label="Description"
                  variant="outlined"
                  name="description"
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Name"
                  variant="outlined"
                  value={user.displayName || "N/A"}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Designation"
                  variant="outlined"
                  value={user.email.split("@")[0]} // Extract username from email
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default SendNotice;
