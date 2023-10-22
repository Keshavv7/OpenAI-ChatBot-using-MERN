import { Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const Logo = () => {
  return (
    <div style={{
        display: 'flex',
        marginRight: 'auto',
        alignItems: 'center',
        gap: "15px",
    }}
    >
        <Link to={"/"}>
            <img 
            src="openai.png" 
            alt="OpenAI" 
            width="32px" 
            height="30px"
            className="image-inverted" 
            />
            
        </Link>
        <Typography
        sx = {{
            display: {
                md: "block",
                xs: "none",
                sm: "none",
            },
            mr: "auto",
            fontWeight: "800",
            textShadow: "2px 2px 10px #000000",
        }}
        >
            <span style={{ fontSize: "20px" }}>MERN</span> ChatGPT
        </Typography>
    </div>
  )
}

export default Logo