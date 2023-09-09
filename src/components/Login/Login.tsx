import { TextField } from '@mui/material';
import { Box } from '@mui/system';
import { Formik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../data/store/userSlice';
import CustomButton from '../CustomButton/CustomButton';
import CustomTextfield from '../CustomTextField/CustomTextField';
import * as Yup from 'yup';

const Login = () => {
  const dispatch = useDispatch();

  const initialValues = { username: '', password: '' };
  


  const validate = (values: typeof initialValues)=>{
    const errors = {username:'',password:''};
 console.log('eno');
 
   if (!values.username) {
     errors.username = 'Required';
   }
 
   //...
   console.log('Validation Errors:', errors); // Log errors
   return errors;
  }


  const handleLogin = (values:any,errors:any) => {
    console.log(errors,'err',values);
    
    dispatch(login({ username: values?.username, password: values?.password }));
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={validate} // Corrected
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
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CustomTextfield
            name="username"
            label="username"
            placeholder="enter username"
            type="text"
            value={values.username}
            variant="filled"
            onChange={handleChange}
          />
            {errors.username && touched.username ? (
             <div>{errors.username}</div>
           ) : null}
          <CustomTextfield
            name="password"
            label="password"
            placeholder="enter password"
            type="password"
            value={values.password}
            variant="filled"
            onChange={handleChange}
          />
                {errors && errors.password && touched.password ? (
             <div>{errors.password}</div>
           ) : null}
          <CustomButton onClick={()=>handleLogin(values,errors)}>Confirm</CustomButton>
        </Box>
      )}
    </Formik>
  );
};

export default Login;
