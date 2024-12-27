import React, { useState } from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import { getUserInfo } from "../firebaseUtils/getRequests";
import { auth } from "../firebaseUtils/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
const Profile = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log(user);
      if (user) {
        const res = await getUserInfo(user.uid);
        setProfile(res);
        console.log("res", res);
      }
    });

    return () => unsubscribe();
  }, []);
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
          value={auth && auth?.currentUser?.email}
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
