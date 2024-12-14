import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import PhoneIcon from "@mui/icons-material/Phone";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getAllInchargeDetails } from "../api/getMessInchargeDetails";
import { auth } from "../firebaseUtils/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
function MessInchargeDetailsCard() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setShow(true);
      } else {
        setShow(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);
  const [messDetails, setMess] = useState([]);
  const getData = async () => {
    setMess(await getAllInchargeDetails());
  };
  useEffect(() => {
    getData();
  }, []);
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <Card variant="outlined" sx={{ height: "100%", flexGrow: 1, boxShadow: 3 }}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography component="h1" variant="subtitle1" gutterBottom>
            Mess Incharge Details
          </Typography>
          {show && (
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => navigate("/editIncharge")}
            >
              Edit
            </Button>
          )}
        </Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 2,
            paddingTop: "15px",
          }}
        >
          {messDetails.map((mess, index) => (
            <Box
              key={index}
              sx={{
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
                  fontWeight: 600,
                  marginBottom: "5px",
                }}
              >
                {mess.messName}
              </Typography>
              <Typography variant="body2" sx={{ marginBottom: "5px" }}>
                Incharge: {mess.InchargeName}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <PhoneIcon fontSize="small" sx={{ marginRight: "5px" }} />
                {mess.phone}
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}

MessInchargeDetailsCard.propTypes = {
  messDetails: PropTypes.arrayOf(
    PropTypes.shape({
      messName: PropTypes.string.isRequired,
      inchargeName: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default MessInchargeDetailsCard;
