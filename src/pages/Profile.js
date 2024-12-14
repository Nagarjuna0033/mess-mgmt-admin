import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import { getUserInfo } from "../firebaseUtils/getRequests";
import { auth } from "../firebaseUtils/firebaseConfig";
const Profile = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    if (auth.currentUser) {
      const res = await getUserInfo(auth.currentUser.uid);
      setProfile(res);
    } else {
      console.log("No user is logged in.");
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        margin: "auto",
        padding: 3,
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        borderRadius: 2,
      }}
    >
      <Stack spacing={2}>
        <Typography variant="h5" fontWeight="bold">
          Profile Details
        </Typography>
        <TextField
          label="Email"
          value={auth.currentUser.email}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          fullWidth
          variant="filled"
        />
        <TextField
          label="Name"
          value={profile && profile.name}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          fullWidth
          variant="filled"
        />

        <TextField
          label="Mobile"
          value={profile && profile.phoneNumber}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          fullWidth
          variant="filled"
        />
        <TextField
          label="Mobile"
          value={profile && profile.gender}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          fullWidth
          variant="filled"
        />
      </Stack>

      <Box sx={{ textAlign: "center", marginTop: 3 }}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate("/edit-profile", { state: profile })}
        >
          Edit Profile
        </Button>
      </Box>
    </Box>
  );
};

export default Profile;
