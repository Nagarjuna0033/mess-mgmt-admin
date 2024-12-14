import React from "react";
import ComplaintCard from "../components/ComplaintCard";
import Filters from "../components/Filters";
import { Box, Button, Stack } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";

export default function AllComplaints() {
  const [complaints, setComplaints] = useState(null);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllComplaints();
  }, []);

  useEffect(() => {
    if (category === "") {
      setFilteredComplaints(complaints);
    } else {
      setFilteredComplaints(
        complaints.filter((item) => item.category === category)
      );
    }
  }, [category, complaints]);

  const getAllComplaints = async () => {
    try {
      const res = await axios.get(
        "https://us-central1-mess-management-250df.cloudfunctions.net/getcomplaintsData",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setComplaints(res.data.complaints.complaints);
      setFilteredComplaints(res.data.complaints.complaints);
    } catch (e) {
      console.log(e);
    }
  };

  const handleResolve = async () => {
    setLoading(true);

    try {
      const res = await axios.get(
        `https://us-central1-mess-management-250df.cloudfunctions.net/resolveAllComplaints?status=done&category=${category}`
      );
      if (res.status === 200) {
        await getAllComplaints();
        setCategory("");
        toast.success(
          `Complaint with category ${category} moved to status done`
        );
      } else {
        toast.error(
          `Error in moving Complaint with category ${category} to status done`
        );
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setCategory("");
    }
  };

  return (
    <>
      <ToastContainer />
      <Stack sx={{ width: "100%" }}>
        <Stack
          direction="row"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Filters setCategory={setCategory} category={category} />
          {category !== "" && (
            <Button
              variant="outlined"
              color="secondary"
              disabled={loading}
              onClick={handleResolve}
            >
              Mark all {category} complaints as Completed
            </Button>
          )}
        </Stack>

        <Box sx={{ mt: 1 }}>
          <Stack spacing={1}>
            {filteredComplaints &&
              filteredComplaints.map((ele, index) => (
                <ComplaintCard
                  complaint={ele}
                  key={index}
                  index={index}
                  getAllComplaints={getAllComplaints}
                />
              ))}
          </Stack>
        </Box>
      </Stack>
    </>
  );
}
