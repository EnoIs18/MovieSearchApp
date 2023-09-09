import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { login, register, selectLoggedUser } from "../../data/store/userSlice";
import CustomButton from "../CustomButton/CustomButton";
import { Link } from "react-router-dom";

export default function Register() {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  const userLogged = useSelector(selectLoggedUser);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  
  return (
    <div>
      <CustomButton variant="outlined" onClick={handleClickOpen}>
        Register
      </CustomButton>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Register</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <TextField label="Username" />
            <TextField label="Password" />
          </Box>
        </DialogContent>
        <DialogActions>
          <CustomButton onClick={handleClose}>Cancel</CustomButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
