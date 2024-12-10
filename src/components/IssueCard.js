import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
export default function IssueCard({ issue, index }) {
  const theme = useTheme();
  return (
    <div>
      <Box
        key={index}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px",
          borderRadius: 1,
          backgroundColor:
            index % 2 === 0 ? theme.palette.action.hover : "transparent",
          boxShadow: 1,
          transition: "background-color 0.3s ease-in-out",
          "&:hover": {
            backgroundColor: theme.palette.action.selected,
            boxShadow: 3,
          },
        }}
      >
        <Typography
          variant="body1"
          sx={{
            flexGrow: 1,
            fontWeight: 600,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {issue.name}
        </Typography>
        <Stack direction="row" spacing={1} alignItems="center">
          <Chip
            label={
              <>
                <ThumbUpIcon fontSize="small" /> {issue.upvotes}
              </>
            }
            size="small"
            sx={{
              fontWeight: 600,
              borderRadius: "12px",
            }}
          />
          <Chip
            label={
              <>
                <ThumbDownIcon fontSize="small" /> {issue.downvotes}
              </>
            }
            size="small"
            sx={{
              fontWeight: 600,
              borderRadius: "12px",
            }}
          />
        </Stack>
      </Box>
    </div>
  );
}
