import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Box, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { login, selectLoggedUser } from "../../data/store/userSlice";
import CustomButton from "../CustomButton/CustomButton";
import BasicTabs from "../TabPanel/CustomTabPanel";

export default function AuthModal() {
  const [open, setOpen] = React.useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <CustomButton   style={{
                    backgroundColor: '#fff ',
                    color: '#000',    
                }} variant="outlined" onClick={handleClickOpen}>
        LOGIN
      </CustomButton>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <BasicTabs handleClose={handleClose} /> 
        </DialogContent>
        <DialogActions>
          <CustomButton onClick={handleClose}>Close</CustomButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
