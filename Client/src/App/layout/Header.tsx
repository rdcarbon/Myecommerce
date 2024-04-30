// import React from 'react'

import { AppBar, Switch, Toolbar, Typography } from "@mui/material";
import { useContext } from "react";
import { DarkThemeContext } from "../context/DarkThemeContext";

// type Props = {}

export default function Header() {
  const { darkMode,toggleTheme}=useContext(DarkThemeContext)
//  const [toggle, setToggle]=useState(false)
 // useEffect(()=>toggleTheme(),[toggle])
  return (
    <AppBar position="static" sx={{mb:8}}>
      <Toolbar>
         
        <Typography variant="h6">RE-Store</Typography>
          <Switch checked={darkMode} onChange={()=>toggleTheme()}/>
  
      </Toolbar>  
      
      
    </AppBar>
  );
}
