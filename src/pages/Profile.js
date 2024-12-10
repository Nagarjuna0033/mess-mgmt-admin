import React from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const Profile = () => {
  const navigate=useNavigate()
  const profile = {
    name: "J.Revanth Kumar",
    designation: "Director",
    mail: "director@rguktrkv.ac.in",
    mobileNumber: "9030808053",
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
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
        <Typography>
          <strong>Name:</strong> {profile.name}
        </Typography>
        <Typography>
          <strong>Designation:</strong> {profile.designation}
        </Typography>
        <Typography>
          <strong>Email:</strong> {profile.mail}
        </Typography>
        <Typography>
          <strong>Mobile:</strong> {profile.mobileNumber}
        </Typography>
      </Stack>

      
      <Box sx={{ textAlign: "center", marginTop: 3 }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate("/edit-profile")}
        >
          Edit Profile
        </Button>
      </Box>
    </Box>
  );
};

export default Profile;
