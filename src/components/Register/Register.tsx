import React from 'react'
import { TextField } from '@mui/material'
import { Box } from '@mui/system'
import { Formik } from 'formik'
import { useDispatch } from 'react-redux'
import { register } from '../../data/store/userSlice'
import CustomButton from '../CustomButton/CustomButton'
import CustomTextfield from '../CustomTextField/CustomTextField'

const Register = () => {
const dispatch = useDispatch()

const initialValues = {username:'',password:''}
const validate = ()=>{}


    const handleRegister = (values:any) => {

      console.log(values,' register formik');

      dispatch(register({ username: values?.username, password: values?.password , isLoggedIn: false,
        favorites: [],}));

    }

  return (
 <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={handleRegister}
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
            <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CustomTextfield name="username" label="Username" placeholder='enter username' type='text' value={values?.username} variant='filled'  onChange={handleChange}  />
            <CustomTextfield  name="password" label="Password" placeholder='enter password' type='text' value={values?.password} variant='filled'  onChange={handleChange}  />
          <CustomButton onClick={()=>handleRegister(values)}>Confirm</CustomButton>
          </Box>
        )}
      </Formik>

  )
}

export default Register