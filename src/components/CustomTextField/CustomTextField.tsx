import { SxProps, TextField, TextFieldVariants, Theme } from "@mui/material";
import React from "react";

interface CustomTextfieldProps {
  type: string;
  onChange:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
  value: string;
  label?: string;
  variant?: TextFieldVariants | undefined;
  disabled?: boolean;
  style?: SxProps<Theme> | undefined;
  placeholder: string;
  name:string
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
  name
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
    />
  );
};

export default CustomTextfield;
