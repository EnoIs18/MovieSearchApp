import React from "react";
import { Box, Typography } from "@mui/material";
import CustomTextfield from "../CustomTextField/CustomTextField";
interface AuthFormFieldProps {
    name: string;
    label?: string;
    placeholder?: string;
    type: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    touched?:any;
    errors?:any;
    variant?: "outlined" | "filled" | "standard" | undefined; 
    fullWidth?:boolean
}
const AuthFormField = ({fullWidth,variant, name, label, placeholder, type, value, onChange, touched, errors}:AuthFormFieldProps) => {
  return (
    <Box >
      <CustomTextfield
        name={name}
        label={label}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
        variant={variant}
        fullWidth={fullWidth}
      />
         {touched && errors && (
              <Typography variant="body2" style={{ color: "red",paddingTop:10 }}>
              {errors}
            </Typography>
          )}
    </Box>
  );
};

export default AuthFormField;
