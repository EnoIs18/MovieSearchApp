import React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface CustomSelectorProps {
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
  placeholder?:string;
}

export default function CustomSelector({ value, onChange, children, placeholder}: CustomSelectorProps) {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 200 }}>
      <FormControl fullWidth>
        <Select
          labelId="custom-select-label"
          id="custom-select"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          sx={{
            color: '#000',
            backgroundColor: '#e0d5d5',
            borderRadius: 1,
            boxShadow: '0 0 8px rgba(255, 255, 255, 0.6)',
            '& input': {
              color: 'black  !important', 
            },
    }}
        >
          {children}
        </Select>
      </FormControl>
    </Box>
  );
}
