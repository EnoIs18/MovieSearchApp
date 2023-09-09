import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';
import CustomButton from '../CustomButton/CustomButton';
import { useDispatch } from 'react-redux';
import { login, register } from '../../data/store/userSlice';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  handleLogin?: () => void
  handleRegister?:()=>void
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, handleLogin,...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const dispatch = useDispatch();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleLogin = () => {
    dispatch(login({ username: "test", password: "1234" }));
  };
  
  const handleRegister = () => {
    dispatch(register({ username: "test", password: "1234" ,favorites:[],isLoggedIn:false}));
  };
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="LOGIN" {...a11yProps(0)} />
          <Tab label="REGISTER" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0} handleLogin={handleLogin}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
            <TextField label="Username" />
            <TextField label="Password" />
          <CustomButton onClick={handleLogin}>Confirm</CustomButton>
          </Box>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1} handleRegister={handleRegister}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
            <TextField label="Username" />
            <TextField label="Password" />
          <CustomButton onClick={handleRegister}>Confirm</CustomButton>

          </Box>
      </CustomTabPanel>
    </Box>
  );
}