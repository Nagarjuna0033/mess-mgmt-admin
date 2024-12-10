import React from "react";
import ComplaintCard from "../components/ComplaintCard";
import Filters from "../components/Filters";
import { Box, Stack } from "@mui/material";
const dummyComplaints = [
  {
    hashTag: "hygine",
    shortMsg: "Collapsible Group Item #1",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
    status: "Done",
  },
  {
    hashTag: "timings",
    shortMsg: "Collapsible Group Item #2",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
    status: "In Review",
  },
  {
    hashTag: "taste",
    shortMsg: "Collapsible Group Item #3",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
    status: "Done",
  },
  {
    hashTag: "others",
    shortMsg: "Collapsible Group Item #4",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
    status: "In Review",
  },
  {
    hashTag: "hygine",
    shortMsg: "Collapsible Group Item #5",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
    status: "Done",
  },
];
export default function AllComplaints() {
  return (
    <>
      <Stack>
        <Filters />
        <Box sx={{ mt: 1 }}>
          <Stack spacing={1}>
            {dummyComplaints.map((ele, index) => (
              <ComplaintCard complaints={ele} key={index} index={index} />
            ))}
          </Stack>
        </Box>
      </Stack>
    </>
  );
}
