// import { useState, useEffect } from "react";
//import reactLogo from '../assets/react.svg'
//import viteLogo from '../vite.svg'
// import { /*useEffect,*/ useContext, useEffect, useState } from "react";
import "./App.css";
// import { Product } from "./models/product";
import Catalog from "./features/Catalog/Catalog";
//import { Typography } from "@mui/material";
import Header from "./layout/Header";
import {
  Container,
  CssBaseline,
} from "@mui/material";
import {
  DarkThemeProvider,
  // DarkThemeContext,
} from "./context/DarkThemeContext";
//import { ThemeContext } from "@emotion/react";

function App() {
  // const [products, setProducts] = useState<Product[]>([]);
  // useEffect(() => {
  //   fetch("https://localhost:7000/api/products")
  //     .then((response) => response.json())
  //     .then((data) => setProducts(data));
  // }, []);
  // function addProduct() {
  //   setProducts((prevState) => [
  //     ...prevState,
  //     {
  //       name: "product" + prevState.length,
  //       id: prevState.length + 1,
  //       price: 1000,
  //       pictureUrl:
  //         "https://plus.unsplash.com/premium_photo-1680087014917-904bb37c5191?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     },
  //   ]);
  // }
  // const [darkMode, setDarkMode]=useState(false);
  // const { darkMode } = useContext(DarkThemeContext);

  // const palettetype = darkMode ? "dark" : "light";
  //const toggledarkMode =()=>{setDarkMode((prevDarkMode)=>!prevDarkMode)};
  // const [theme, setTheme] = useState(
  //   createTheme({
  //     palette: {
  //       mode: palettetype,
  //     },
  //   })
  // );
  // useEffect(() => {
  //   // const paltype = darkMode ? "dark" : "light";
  //   setTheme(()=>
  //     createTheme({
  //       palette: {
  //         mode: darkMode?'dark':'light',
  //       },
  //     })
  //   );
  // }, [darkMode]);

  return (
    <DarkThemeProvider>
     
        <CssBaseline />
        <Header />
        <Container>
          <Catalog />
        </Container>
 
    </DarkThemeProvider>
  );
}
export default App;
