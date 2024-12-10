import React, { useState } from 'react';
import { Box, TextField, Typography, Button, Stack } from '@mui/material';

const EditProfile = () => {
  const [profile, setProfile] = useState({
    name: "J.Revanth Kumar",
    designation: "Director",
    mail: "director@rguktrkv.ac.in",
    mobileNumber: "9030808053",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    alert(`Profile saved!\nName: ${profile.name}\nMobile: ${profile.mobileNumber}`);
    // You can add logic here to send the updated profile to a server.
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
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
          name="name"
          value={profile.name}
          onChange={handleChange}
          fullWidth
          sx={{margin:"20 px"}}
        />
        <TextField
          label="Mobile Number"
          name="mobileNumber"
          value={profile.mobileNumber}
          onChange={handleChange}
          fullWidth
          sx={{margin:"20 px"}}
        />

        
        <TextField
          label="Email"
          value={profile.mail}
          InputProps={{
            readOnly: true,
          }}
          fullWidth
          sx={{margin:"20 px"}}
        />
        
        <TextField
          label="Designation"
          value={profile.designation}
          InputProps={{
            readOnly: true,
          }}
          fullWidth
          sx={{margin:"20 px"}}
        />
      </Stack>

      
      <Box sx={{ textAlign: "center", marginTop: 3 }}>
        <Button variant="contained" color="secondary" onClick={handleSave}>
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default EditProfile;
