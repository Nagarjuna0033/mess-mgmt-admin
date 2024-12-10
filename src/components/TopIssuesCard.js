import * as React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function TopIssuesCard({ issues }) {
    const theme = useTheme();
    const navigate=useNavigate();
    // Sort issues by upvotes in descending order
    const sortedIssues = issues.sort((a, b) => b.upvotes - a.upvotes);

    return (
        <Card variant="outlined" sx={{ height: "100%", flexGrow: 1, boxShadow: 3 }}>
            <CardContent >
                <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between" ,alignItems: "center",}}>
                <Typography component="h1" variant="subtitle1" gutterBottom>
                    Top Issues
                </Typography>
                    <Button sx={{ background: "cyan" }} onClick={()=>navigate("/current-issues")}>See All Issues</Button>
                </Box>
                
                <Stack direction="column" spacing={2} sx={{ paddingTop: "15px" }}>
                    {sortedIssues.map((issue, index) => (
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
                                    label={<><ThumbUpIcon fontSize="small" /> {issue.upvotes}</>}

                                    size="small"
                                    sx={{
                                        fontWeight: 600,
                                        borderRadius: "12px",
                                    }}
                                />
                                <Chip
                                    label={<><ThumbDownIcon fontSize="small" /> {issue.downvotes}</>}

                                    size="small"
                                    sx={{
                                        fontWeight: 600,
                                        borderRadius: "12px",

                                    }}
                                />
                            </Stack>
                        </Box>
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
