import * as React from "react";
import PropTypes from "prop-types";
import { Box, Card, CardContent, Typography, Stack, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function MenuCard({ menu }) {
    const navigate=useNavigate()
    return (
        <Card variant="outlined" sx={{ height: "100%", flexGrow: 1, boxShadow: 3 }}>
            <CardContent>
                <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between",alignItems: "center", }}>
                    <Typography component="h2" variant="subtitle1" gutterBottom>
                        Today's Menu
                    </Typography>
                    <Button variant="contained" color="secondary" onClick={()=>navigate("/menu")}>See Weekly Menu</Button>
                </Box>
                
                <Stack direction="column" spacing={2}>
                    {Object.keys(menu).map((mealType, index) => (
                        <Box
                            key={index}
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 1,
                                padding: "12px",
                                borderRadius: 1,
                                backgroundColor: index % 2 === 0 ? "action.hover" : "transparent",
                                boxShadow: 1,
                                transition: "background-color 0.3s ease-in-out",
                                "&:hover": {
                                    backgroundColor: "action.selected",
                                    boxShadow: 3,
                                },
                            }}
                        >
                            <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                {mealType}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                }}
                            >
                                {menu[mealType]}
                            </Typography>
                        </Box>
                    ))}
                </Stack>
            </CardContent>
        </Card>
    );
}

MenuCard.propTypes = {
    menu: PropTypes.shape({
        Breakfast: PropTypes.string.isRequired,
        Afternoon: PropTypes.string.isRequired,
        Snacks: PropTypes.string.isRequired,
        Night: PropTypes.string.isRequired,
    }).isRequired,
};

export default MenuCard;
