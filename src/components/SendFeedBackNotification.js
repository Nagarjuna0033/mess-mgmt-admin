import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import CustomDatePicker from './CustomDatePicker';
import { Typography } from '@mui/material';

export default function SendFeedbackNotification() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleSendNotification = () => {
    if (startDate && endDate) {
      // Add logic to handle the notification send
      alert(`Notification sent for dates: ${startDate.format('MMM DD, YYYY')} to ${endDate.format('MMM DD, YYYY')}`);
    } else {
      alert('Please select both start and end dates!');
    }
  };

  return (
    <Stack spacing={3} direction="column" alignItems="center" sx={{ p: 3 }}>
        <Typography
          variant="h5"
          fontWeight="bold"
          textAlign="center"
          sx={{ mt: 3 }}
        >
          Send Feedback Notification
        </Typography>
    
      <CustomDatePicker
        value={startDate}
        onChange={setStartDate}
        label="Start Date"
      />
      <CustomDatePicker
        value={endDate}
        onChange={setEndDate}
        label="End Date"
      />
      <Button
        variant="outlined"
        color="secondary"
        onClick={handleSendNotification}
      >
        Send Notification
      </Button>
    </Stack>
  );
}
