// import React from 'react'

import {
  AppBar,
  Badge,
  Box,
  IconButton,
  List,
  ListItem,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import { DarkThemeContext } from "../context/DarkThemeContext";
import { NavLink } from "react-router-dom";
import { ShoppingCart } from "@mui/icons-material";
//import { BasketContext } from "../context/BasketContext";
import { useSelector } from "react-redux";
import { RootState } from "../redux/stores/store";

// type Props = {}
const midlinks = [
  { title: "Catalog", path: "/Catalog" },
  { title: "About", path: "/about" },
  { title: "Contact", path: "/Contact" },
];
const rightlinks: { title: string; path: string }[] = [
  { title: "Login", path: "/Login" },
  { title: "Register", path: "/register" },
];
const navStyles: object = {
  color: "inherit",
  textDecoration:'None',
  typography: "h6",
  "&:hover": {
    color: "grey.500",
  },
  "&.active": {
    color: "text.secondary",
  },
};
export default function Header() {
  const { darkMode, toggleTheme } = useContext(DarkThemeContext);
  //  const [toggle, setToggle]=useState(false)
  // useEffect(()=>toggleTheme(),[toggle])
  const {basket}=useSelector((state:RootState)=>(state.basket))
  const itemsCount=basket?.items.reduce((sum,item)=>sum+item.quantity,0)
  
  return (
    <AppBar position='relative' sx={{ mb: 4 }}>
      <Toolbar sx={{display:'flex', justifyContent:'space-between',alignItems:'right'}}>
        <Box sx={{display:'flex',alignItems:'center'}}>
          <Typography
            variant="h6"
            component={NavLink}
            to="/"
            sx={{  color: "inherit",
            textDecoration:'None',
            typography: "h6",
            "&:hover": {
              color: "grey.500",
            },}}
          >
            RE-Store
          </Typography>
          <Switch checked={darkMode} onChange={toggleTheme} />
        </Box>
        <List sx={{ display: "flex" }}>
          {midlinks.map(({ title, path }) => (
            <ListItem component={NavLink} to={path} sx={navStyles} key={path}>
              {title.toUpperCase()}
            </ListItem>
          ))}
        </List>
        <Box sx={{display:'flex', alignItems:'center'}}>
          <IconButton component={NavLink} to={"/shopping-cart"} size="large" edge="start" color="inherit" sx={{ mr: 2 }}  >
           {basket?.items.length?  <Badge badgeContent={itemsCount} color="secondary">
              <ShoppingCart />
            </Badge>: <ShoppingCart/>}
          </IconButton>
          <List sx={{ display: "flex" }}>
            {rightlinks.map(({ title, path }) => (
              <ListItem component={NavLink} to={path} sx={navStyles} key={path}>
                {title.toUpperCase()}
              </ListItem>
            ))}
          </List>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
