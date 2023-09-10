import { TextField } from "@mui/material";
import React from "react";

interface CustomTextfieldProps {
  type: string;
  onChange:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
  value: string;
  label?: string;
  variant?: "outlined" | "filled" | "standard" | undefined; 
  disabled?: boolean;
  style?: React.CSSProperties | undefined; 
  placeholder?: string;
  name: string;
  children?: React.ReactNode;
  fullWidth?:boolean 
}

const CustomTextfield = ({
  type,
  onChange,
  value,
  label = "",
  variant = "outlined",
  disabled = false,
  style,
  placeholder,
  name,
  children, 
  fullWidth
}: CustomTextfieldProps) => {
  return (
    <TextField
      name={name}
      placeholder={placeholder}
      type={type}
      onChange={onChange}
      value={value}
      label={label}
      variant={variant}
      sx={style}
      disabled={disabled}
      fullWidth={fullWidth}
      InputProps={{
        endAdornment: children, 
      }}
    />
  );
};

export default CustomTextfield;
