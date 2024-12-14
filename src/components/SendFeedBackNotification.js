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

export default function SendFeedbackNotification() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleSendNotification = async () => {
    setLoading(true);
    console.log(startDate);
    if (startDate && endDate) {
      await sendNotifications({
        payload: {
          token:
            "dfuw0VcVSVSuwkYJZTp3FL:APA91bHCegEXm1ogcfUfSKhjGJKpIS70KOv-F0UliM8EHY3-6M5YSl3wUHWx0vXHv1xOyHOwqUFEd-SN7YUzJ7sLx9LIruzz4Z4owkIGa5MkIPALXzxor6w",

          notification: {
            title: "Hey ✋✋✋",
            body: `Please Submit Mess Feedback from ${startDate} to ${endDate}`,
          },
          data: {
            type: "feedback",
          },
        },
      });
      // const tokens = [
      //   "e48GdzhsSOqwFYi2rlnlGv:APA91bEJoVnzZPjg8DStCMzsmfpQKUoE6MxBmRBgjzTtVo2CIKf73p1wUFjTyaaVLvCo0taeOoUSfh6XNEU8gFjfnQ0RcOu9QI14bRQ2PIk7M0X-Axg7LOg",
      //   "e31PaxtgTay_-gIcPNFABx:APA91bE1rEoXwkuTCfR6YSaxzPlqKXddkzLvCTins1CGCK3u5D6Fg0v98dNnOw_oDlIJVgS4rQKr3KRaAk47qG_lxB-KJbAfkaWfbno-C3LqmT6DFTm-dnk",
      // ];

      // for (const token of tokens) {
      //   await sendNotifications({
      //     payload: {
      //       token,
      //       notification: {
      //         title: "Hey ✋✋✋",
      //         body: `Please Submit Mess Feedback from ${startDate} to ${endDate}`,
      //       },
      //       data: {
      //         type: "feedback",
      //       },
      //     },
      //   });
      // }
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
