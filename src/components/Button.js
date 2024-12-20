import React from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { ArrowCircleRight } from "@mui/icons-material";
export default function Button({ isLoading, onClick, text }) {
  return (
    <>
      <LoadingButton
        sx={{ width: "50%" }}
        loading={isLoading}
        loadingPosition="start"
        startIcon={<ArrowCircleRight />}
        variant="outlined"
        color="secondary"
        onClick={onClick}
      >
        {text}
      </LoadingButton>
    </>
  );
}
