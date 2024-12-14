import React, { useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import CustomDatePicker from "./CustomDatePicker";
import { Typography } from "@mui/material";
import { sendNotifications } from "../firebaseUtils/sendNotificatoins";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
export default function SendFeedbackNotification() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSendNotification = async () => {
    setLoading(true);
    console.log(startDate);
    if (startDate && endDate) {
      // await sendNotifications({
      //   payload: {
      //     token: [
      //       "e48GdzhsSOqwFYi2rlnlGv:APA91bEJoVnzZPjg8DStCMzsmfpQKUoE6MxBmRBgjzTtVo2CIKf73p1wUFjTyaaVLvCo0taeOoUSfh6XNEU8gFjfnQ0RcOu9QI14bRQ2PIk7M0X-Axg7LOg",
      //       "e31PaxtgTay_-gIcPNFABx:APA91bE1rEoXwkuTCfR6YSaxzPlqKXddkzLvCTins1CGCK3u5D6Fg0v98dNnOw_oDlIJVgS4rQKr3KRaAk47qG_lxB-KJbAfkaWfbno-C3LqmT6DFTm-dnk",
      //     ],
      //     notification: {
      //       title: "Hey ✋✋✋",
      //       body: "Please Submit Mess Feedback for this month",
      //     },
      //     data: {
      //       type: "feedback",
      //     },
      //   },
      // });
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

        <CustomDatePicker
          value={startDate}
          onChange={(date) => {
            setStartDate(date);
          }}
          label="Start Date"
        />
        <CustomDatePicker
          value={endDate}
          onChange={(date) => {
            console.log(date);
            setEndDate(date);
          }}
          label="End Date"
        />
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
