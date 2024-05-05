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
  return (
    <AppBar position="static" sx={{ mb: 4 }}>
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
          <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }}>
            <Badge badgeContent={5} color="secondary">
              <ShoppingCart />
            </Badge>
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
