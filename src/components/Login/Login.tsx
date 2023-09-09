import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { login, selectLoggedUser } from "../../data/store/userSlice";
import CustomButton from "../CustomButton/CustomButton";

export default function Login() {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  const userLogged = useSelector(selectLoggedUser);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogin = () => {
    dispatch(login({ username: "test", password: "1234" }));
    handleClose();
  };
  return (
    <div>
      <CustomButton variant="outlined" onClick={handleClickOpen}>
        LOGIN
      </CustomButton>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">LOGIN</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <TextField label="Username" />
            <TextField label="Password" />
          </Box>
        </DialogContent>
        <DialogActions>
          <CustomButton onClick={handleClose}>Cancel</CustomButton>
          <CustomButton onClick={handleLogin}>Confirm</CustomButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
