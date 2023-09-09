import { TextField } from '@mui/material';
import { Box } from '@mui/system';
import { Formik } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  login, SelectAuthError, SelectShowNotification } from '../../data/store/userSlice';
import CustomButton from '../CustomButton/CustomButton';
import CustomTextfield from '../CustomTextField/CustomTextField';
import * as Yup from 'yup';

const Login = ({handleClose}:any) => {
  const dispatch = useDispatch();

  const initialValues = { username: '', password: '' };
  let error = useSelector(SelectAuthError)



  const handleLogin = (values:any,errors:any) => {
    console.log(errors,'err',values);
    
    dispatch(login({ username: values?.username, password: values?.password }));
    if(error=''){
      handleClose()
    }
  };


  const validationSchema = Yup.object().shape({
    username: Yup.string()
    .required('Username is required')
    .matches(/^[A-Z][a-zA-Z]*$/, 'Username must start with a capital letter and can only contain letters')
    .min(2, 'Username must be at least 2 characters long')
    .max(20, 'Username cannot be longer than 20 characters'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .max(20, 'Password cannot be longer than 20 characters'),
  });



  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema} 
      onSubmit={handleLogin}
    >
      {({
        errors,
        values,
        handleChange,
        handleSubmit,
        handleReset,
        touched,
        setFieldValue,
        resetForm,
      }) => (
        <Box sx={{ display: 'flex', flexDirection: 'column' ,gap:2}}>
          <CustomTextfield
            name="username"
            label="Username"
            placeholder="Enter username"
            type="text"
            value={values.username}
            variant="standard"
            onChange={handleChange}
          />
          {touched.username && errors.username && (
            <div style={{ color: 'red' }}>{errors.username}</div>
          )}
          <CustomTextfield
            name="password"
            label="Password"
            placeholder="Enter password"
            type="password"
            value={values.password}
            variant="standard"
            onChange={handleChange}
          />
            {touched.password && errors.password && (
            <div style={{ color: 'red' }}>{errors.password}</div>
          )}
          <CustomButton onClick={handleSubmit as any}>Confirm</CustomButton>
        
        </Box>
        
      )}
    </Formik>
  );
};

export default Login;
