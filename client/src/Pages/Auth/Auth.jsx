import React, { createContext, useEffect, useState } from 'react'
import { Box, Grid, Typography } from '@mui/material'
import Login from "../../Components/Auth/Login/Login"
import Register from '../../Components/Auth/Register/Register';
export const signupToggle = createContext();


const Auth = () => {
  const [toggle, setToggle] = useState(false);
  
  useEffect(() => {
    if (window.location.pathname === "/register") {
      setToggle(true);
    }
  }, []);
  return (
    <Box
      sx={{
        bgcolor: "#eaeaf0",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Grid
        container
        sx={{
          boxShadow:
            "rgba(17, 17, 26, 0.05) 0px 4px 16px, rgba(17, 17, 26, 0.08) 0px 8px 32px",
          height: "70%",
          width: { xs: "95%", sm: "80%", md: "70%" },
        }}
      >
        <Grid
          item
          sm={6}
          sx={{
            display: { xs: "none", sm: "flex" },
            justifyContent:"center",
            flexDirection:"column",
            height: "100%",
            paddingLeft:"5rem"
          }}
        >
          <Typography variant="h3" sx={{color:"#279cff",fontFamily:" sans-serif",fontWeight:700}}>twaddle</Typography>
          <Typography variant="h6" sx={{color:"#1b1b1b",fontFamily:"Montserrat, sans-serif",fontWeight:500}}>Join an Exciting Social Experience.</Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          display={!toggle && "flex"}
          sx={{
            justifyContent: "center",
            backgroundColor: "#1976d20a",
            height: "100%",
            padding: { xs: 1, sm: 0 },
          }}
        >
          <signupToggle.Provider value={{toggle,setToggle}}>
            {toggle ? <Register /> : <Login />}
          </signupToggle.Provider>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Auth