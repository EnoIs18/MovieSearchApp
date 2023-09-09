import React,{useContext} from 'react'
import { AppBar,IconButton,Toolbar,  } from '@mui/material'



const NavBar = ({children}:any) => {
  return (
    <AppBar  style={{

        padding: '20px',
        backgroundColor: '#080a1a',
    }} >
        <Toolbar style={{padding:5,gap:20}} >
            {children}
        </Toolbar>
    </AppBar>
  )
}

export default NavBar