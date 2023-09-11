import React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { InputLabel } from '@mui/material';

interface CustomSelectorProps {
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
}

export default function CustomSelector({ value, onChange, children}: CustomSelectorProps) {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 200 }}>
      <FormControl fullWidth>
      <InputLabel id="custom-select-labe">Year</InputLabel>
        <Select
          labelId="custom-select-label"
          id="custom-select"
          value={value}
          onChange={handleChange}
          sx={{
            color: '#000',
            backgroundColor: '#e0d5d5',
            borderRadius: 1,
            boxShadow: '0 0 8px rgba(255, 255, 255, 0.6)',
    }}
        >
          {children}
        </Select>
      </FormControl>
    </Box>
  );
}
