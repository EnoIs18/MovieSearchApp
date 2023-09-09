import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { SelectAuthError, SelectShowNotification, SelectTextNotification, setNotification } from '../../data/store/userSlice';

export default function SimpleSnackbar({children}:any) {
const showNotification  = useSelector(SelectShowNotification)
const textNotification  = useSelector(SelectTextNotification)
const  showError = useSelector(SelectAuthError)
const dispatch = useDispatch()

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(setNotification(false))

  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
  
      <Snackbar
        open={showNotification}
        autoHideDuration={6000}
        onClose={handleClose}
        message={showError ? showError : textNotification}
        action={action}
      />
      {children}
    </div>
  );
}