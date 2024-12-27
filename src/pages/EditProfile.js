import React, { useState } from "react";
import { Box, TextField, Typography, Button, Stack } from "@mui/material";
import { useLocation } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { auth } from "../firebaseUtils/firebaseConfig";
import { createUser, updateUser } from "../firebaseUtils/createDoc";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "../firebaseUtils/getRequests";
import { onAuthStateChanged } from "firebase/auth";
const EditProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location.state);
  const [profile, setProfile] = useState(null);
  const [user, setUser] = useState(null);
  console.log("profile", profile);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log(user);
      if (user) {
        setUser(user);
        const res = await getUserInfo(user.uid);

        setProfile(res);
        console.log("res", res);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      profile.uid = localStorage.getItem("id");
      profile.email = user.email;
      if (localStorage.getItem("details") === "false") {
        const res = await createUser(profile);
        if (res === 200) {
          localStorage.setItem("details", "true");
        }
      } else {
        const res = await updateUser(profile);

        if (res === 200) {
        }
      }
      navigate("/profile");
    } catch (error) {
      console.log(error);
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
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Edit Profile
      </Typography>

      <Stack spacing={2}>
        <TextField
          label="Name"
          id="outlined"
          name="name"
          variant="standard"
          value={profile && profile.name}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Mobile Number"
          name="phoneNumber"
          variant="standard"
          value={profile && profile.phoneNumber}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          label="Email"
          value={user && user.email}
          variant="standard"
          InputProps={{
            readOnly: true,
          }}
          fullWidth
        />
        <FormControl variant="standard" sx={{ minWidth: "100%" }}>
          <InputLabel>Gender</InputLabel>
          <Select
            name="gender"
            defaultValue={
              profile && profile.gender === "Male" ? "Male" : "Female"
            }
            onChange={handleChange}
            required
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      <Box sx={{ textAlign: "center", marginTop: 3 }}>
        <Button variant="outlined" color="secondary" onClick={handleSave}>
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default EditProfile;
