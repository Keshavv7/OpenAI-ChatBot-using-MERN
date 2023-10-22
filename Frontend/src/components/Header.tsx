import { AppBar, Toolbar } from '@mui/material'
import React from 'react'
import Logo from './shared/Logo'

const Header = () => {
  return (
    <AppBar 
    sx={{
        bgcolor: "transparent",
        position: "static",
        boxShadow: "none",
    }}
    >
        <Toolbar
        sx = {{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "10vh",
            color: "white",
            fontSize: "2rem",
            fontFamily: "Montserrat",
            fontWeight: "bold",
        
        }}
        >
            <Logo />
        </Toolbar>
    </AppBar>
  )
}

export default Header