import React from 'react'
import { Box } from '@mui/system'
import { Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { register, SelectAuthError } from '../../data/store/userSlice'
import CustomButton from '../CustomButton/CustomButton'
import CustomTextfield from '../CustomTextField/CustomTextField'
import * as Yup from 'yup';
import AuthFormField from '../AuthFormField/AuthFormField'

const Register = ({handleClose}:any) => {
const dispatch = useDispatch()

const initialValues = {username:'',password:''}
let authError = useSelector(SelectAuthError)


    const handleRegister = (values:any) => {

      console.log(values,' register formik');

      dispatch(register({ username: values?.username, password: values?.password , isLoggedIn: false,
        favorites: [],}));
        console.log(authError,'enoooooo');
        
      
    }
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
            <Box sx={{ display: "flex", flexDirection: "column",gap:2,minWidth:500,width:'100%',maxWidth:1000 }}>
        <AuthFormField name="username"   
            label="Username"
            placeholder="Enter username"
            type="text"
            value={values.username}
            variant="standard"
            onChange={handleChange}
            touched={touched.username}
            errors={errors.username}
            fullWidth={true}
          />
                    <AuthFormField
            name="password"
            label="Password"
            placeholder="Enter password"
            type="password"
            value={values.password}
            variant="standard"
            onChange={handleChange}
            touched={touched.password}
            errors={errors.password}
            fullWidth={true}
          />
          <CustomButton onClick={handleSubmit as any}>Register</CustomButton>
          </Box>
        )}
      </Formik>

  )
}

export default Register