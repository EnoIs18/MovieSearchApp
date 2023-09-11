import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Box, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { login, selectLoggedUser } from "../../data/store/userSlice";
import CustomButton from "../CustomButton/CustomButton";
import BasicTabs from "../TabPanel/CustomTabPanel";
interface AuthModalProps {
  handleClickOpen:()=>void;
  handleClose:()=>void;
  open:boolean;
}
export default function AuthModal({handleClickOpen,handleClose,open}:AuthModalProps) {



  return (
    <>
      <CustomButton   style={{
        p:2,
                    backgroundColor: '#ffffffd6 ',
                    color: '#000',    
                }} variant="contained" onClick={handleClickOpen}>
        LOGIN
      </CustomButton>

      <Dialog 
      sx={{width:'100vw'}}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent 
        
        >
          <BasicTabs handleClose={handleClose} /> 
        </DialogContent>
        <DialogActions>
          <CustomButton onClick={handleClose}>Close</CustomButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
