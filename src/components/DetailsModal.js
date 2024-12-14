import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { auth } from "../firebaseUtils/firebaseConfig";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { createUser } from "../firebaseUtils/createDoc";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
export default function DetailsModel({ open, onClose }) {
  const [formData, setFormData] = React.useState({
    email: auth.currentUser?.email || "",
    name: auth.currentUser?.displayName || "",
    phoneNumber: auth.currentUser?.phoneNumber || "",
    gender: "",
    uid: auth.currentUser?.uid || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    console.log(formData);
    try {
      const res = await createUser(formData);
      if (res === 200) {
        localStorage.setItem("details", "true");
        toast.success("Profile Saved successfully");
        onClose();
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to Save profile");
    }
  };
  return (
    <React.Fragment>
      <ToastContainer />
      <Dialog open={open}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            please enter your basic details here.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            value={formData.email}
            disabled
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            onChange={handleInputChange}
            value={formData.name}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="phone"
            name="phoneNumber"
            label="Phone number"
            type="tel"
            fullWidth
            variant="standard"
            onChange={handleInputChange}
            value={formData.phoneNumber}
          />
          <FormControl variant="standard" sx={{ minWidth: "100%" }}>
            <InputLabel id="demo-simple-select-filled-label">Gender</InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              required
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>submit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
