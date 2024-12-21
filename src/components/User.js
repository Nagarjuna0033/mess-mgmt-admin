import * as React from "react";
import Card from "@mui/material/Card";
import Button from "./Button";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Menu, MenuItem } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { removeRoleField, updateUser } from "../firebaseUtils/createDoc";
import { toast } from "react-toastify";
import { sendNotifications } from "../firebaseUtils/sendNotificatoins";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function User({ user, setUser }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const udpateRole = async () => {
    handleMenuClose();
    setIsLoading(true);
    try {
      let res;

      if (user.role) {
        res = await removeRoleField(user.uid);
      } else {
        user.role = "mess coordinator";
        res = await updateUser(user);
      }
      if (res.status === 200 && !user.role) {
        await sendNotifications({
          payload: {
            tokens: [user.FCS_TOKEN],
            data: {
              navigate: "true",
              page: "home",
              title: "Congratulations 🔥🔥🔥",
              body: `you are now mess coordinator`,
            },
          },
        });
      } else {
        await sendNotifications({
          payload: {
            tokens: [user.FCS_TOKEN],
            data: {
              navigate: "true",
              page: "home",
              title: "Oh No ",
              body: `you are relieved as mess coordinator Thanks for your services`,
            },
          },
        });
      }
      console.log(res);
      toast.success(
        "user role updated Successfully. Notification sent to user"
      );
    } catch (error) {
      toast.error("Error in udpating user role");
    }
    setIsLoading(false);
    handleClose();
    setUser(null);
  };
  const menuId = "primary-search-account-menu";
  return (
    <>
      <Card sx={{ maxWidth: "100%" }}>
        <CardHeader
          avatar={
            <Avatar
              sx={{ bgcolor: red[500] }}
              aria-label="recipe"
              src={user.imageURL && user.imageURL}
              L
            >
              {!user.imageURL && user.name.charAt(0).toUpperCase()}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon onClick={handleProfileMenuOpen} />
            </IconButton>
          }
          title={`${user.name}${user.role ? ` (${user.role})` : ""}`}
          subheader={user.email + " ( " + user.gender + " )"}
        />
      </Card>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        id={menuId}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleClickOpen}>
          {user.role ? `Remove as ${user.role}` : `Assign as mess coordinator`}
        </MenuItem>
      </Menu>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          {"Are you sure on assigning mess coordinator?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            You are going to {user.role ? "remove" : "assign"} {user.name} as
            mess coordinator for mess 2
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} text={"Disagree"}>
            Disagree
          </Button>
          <Button onClick={udpateRole} text={"Agree"} isLoading={isLoading}>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
