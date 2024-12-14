import * as React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Stack,
  Button,
} from "@mui/material";
import { formatMessData } from "../utils/formatMessData";
import { useNavigate } from "react-router-dom";
import { getAllMenuData } from "../api/getAllMenuData";
import { useState, useEffect } from "react";
import { getMessMenuUpdatedNumber } from "../api/getMessMenuUpdatedNumber";

function MenuCard() {
  const navigate = useNavigate();

  const [todayMenu, setTodaysMenu] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [menuItemsFromWeb, setMenu] = useState({});

  const fetchMenuData = async () => {
    try {
      const res = await getAllMenuData();
      if (res.status === true) {
        const formattedData = formatMessData(res.data);
        

        localStorage.setItem("menu", JSON.stringify(formattedData));
        setMenu(formattedData);

        const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
        setTodaysMenu(formattedData[today] || []);
        console.log(formattedData[today])
      } else {
        console.error("Error message from API:", res.msg);
      }
    } catch (error) {
      console.error("Error fetching menu data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMenuUpdatedNumber = async () => {
    try {
      const response = await getMessMenuUpdatedNumber();
      return response;
    } catch (error) {
      console.error("Error fetching menu updated number:", error);
      return 0;
    }
  };

  const getData = async () => {
    const fetchedValue = await fetchMenuUpdatedNumber();
    const storedValue = parseInt(localStorage.getItem("isMenuUpdated") || "0", 10);

    if (
      !storedValue ||
      storedValue < fetchedValue ||
      !localStorage.getItem("menu")
    ) {
      await fetchMenuData();
      localStorage.setItem("isMenuUpdated", fetchedValue);
    } else {
      const storedMenu = JSON.parse(localStorage.getItem("menu"));
      setMenu(storedMenu || {});
      
      const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
      console.log(storedMenu[today])
      setTodaysMenu(storedMenu[today] || []);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await getData();
    })();
  }, []);

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Card variant="outlined" sx={{ height: "100%", flexGrow: 1, boxShadow: 3 }}>
      <CardContent>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography component="h2" variant="subtitle1" gutterBottom>
            Today's Menu
          </Typography>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate("/menu")}
          >
            See Weekly Menu
          </Button>
        </Box>

        <Stack direction="column" spacing={2}>
          {todayMenu ? (
            Object.entries(todayMenu).map(([mealType, description], index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  padding: "12px",
                  borderRadius: 1,
                  backgroundColor:
                    index % 2 === 0 ? "action.hover" : "transparent",
                  boxShadow: 1,
                  transition: "background-color 0.3s ease-in-out",
                  "&:hover": {
                    backgroundColor: "action.selected",
                    boxShadow: 3,
                  },
                }}
              >
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {mealType.charAt(0).toUpperCase() + mealType.slice(1)}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {description}
                </Typography>
              </Box>
            ))
          ) : (
            <Typography variant="body2" color="textSecondary">
              No meals available for today.
            </Typography>
          )}
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
