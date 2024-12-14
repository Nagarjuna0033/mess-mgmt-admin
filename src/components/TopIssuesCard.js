import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import IssueCard from "./IssueCard";
import { getIssues } from "../firebaseUtils/getRequests";
function TopIssuesCard({ fromIssues = false }) {
  const navigate = useNavigate();
  const [sortedIssues, setSortedIssues] = React.useState(null);
  React.useEffect(() => {
    getAllIssues();
  }, []);

  const getAllIssues = async () => {
    try {
      const res = await getIssues();
      console.log(res);
      const sorted = res.sort((a, b) => b.upvotes - a.upvotes);
      setSortedIssues(sorted);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card
      variant="outlined"
      sx={{ height: "100%", flexGrow: 1, boxShadow: 3, width: "100%" }}
    >
      <CardContent>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="subtitle1" gutterBottom>
            {fromIssues ? "All Issues" : "Top Issues"}
          </Typography>
          {!fromIssues && (
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => navigate("/current-issues")}
            >
              See All Issues
            </Button>
          )}
        </Box>

        <Stack direction="column" spacing={2} sx={{ paddingTop: "15px" }}>
          {sortedIssues &&
            sortedIssues.map(
              (issue, index) =>
                index < 5 && (
                  <IssueCard issue={issue} index={index} key={index} />
                )
            )}
          {fromIssues &&
            sortedIssues &&
            sortedIssues.map((issue, index) => (
              <IssueCard issue={issue} index={index} key={index} />
            ))}
        </Stack>
      </CardContent>
    </Card>
  );
}

TopIssuesCard.propTypes = {
  issues: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      upvotes: PropTypes.number.isRequired,
      downvotes: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default TopIssuesCard;
