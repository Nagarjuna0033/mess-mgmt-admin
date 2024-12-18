import React, { useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";
import { sendNotifications } from "../firebaseUtils/sendNotificatoins";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import axios from "axios";

export default function SendFeedbackNotification() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleSendNotification = async () => {
    setLoading(true);
    console.log(startDate);
    if (startDate && endDate) {
      const tokens = await axios.get(
        "https://us-central1-mess-management-250df.cloudfunctions.net/getFcmTokens"
      );
      await sendNotifications({
        payload: {
          tokens: tokens.data.tokens,
          data: {
            navigate: "true",
            page: "menu",
            title: "Mess Feedback",
            body: `Submit your mess feedback from  ${startDate} to ${endDate}`,
          },
        },
      });

      toast.success("Notificaion sent successfully");
    } else {
      toast.error("Please select both start and end dates!");
    }
    setLoading(false);
  };

  return (
    <>
      <ToastContainer />
      <Stack spacing={3} direction="column" alignItems="center" sx={{ p: 3 }}>
        <Typography
          variant="h5"
          fontWeight="bold"
          textAlign="center"
          sx={{ mt: 3 }}
        >
          Send Feedback Notification
        </Typography>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              value={startDate ? dayjs(startDate) : null}
              onChange={(newValue) => {
                const formattedDate = newValue
                  ? newValue.format("YYYY-MM-DD")
                  : null;
                setStartDate(formattedDate);
              }}
            />
          </DemoContainer>
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              value={endDate ? dayjs(endDate) : null}
              onChange={(newValue) => {
                const formattedDate = newValue
                  ? newValue.format("YYYY-MM-DD")
                  : null;
                setEndDate(formattedDate);
              }}
            />
          </DemoContainer>
        </LocalizationProvider>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleSendNotification}
          disabled={loading}
        >
          Send Notification
        </Button>
      </Stack>
    </>
  );
}
