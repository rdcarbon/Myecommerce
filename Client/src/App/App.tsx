// import { useState, useEffect } from "react";
//import reactLogo from '../assets/react.svg'
//import viteLogo from '../vite.svg'
// import { /*useEffect,*/ useContext, useEffect, useState } from "react";
import "./App.css";
// import { Product } from "./models/product";
//import Catalog from "./features/Catalog/Catalog";
//import { Typography } from "@mui/material";
import Header from "./layout/Header";
import {
  Container,
  CssBaseline,
  Paper,
} from "@mui/material";
import {
  DarkThemeProvider,
  // DarkThemeContext,
} from "./context/DarkThemeContext";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { getCookie } from "./util/util";
import agent from "./api/agent";
import { setBasket } from "./features/Basket/basketSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./redux/stores/store";
//import { useContext } from "react";
//import { BasketContext } from "./context/BasketContext";
//import { BasketProvider } from "./context/BasketContext";
//import { ThemeContext } from "@emotion/react";

function App ():React.ReactElement{
  const dispatch: AppDispatch = useDispatch();
  //const {basket} = useSelector((state:RootState)=>state.basket)
  React.useEffect(() => {
    const buyerid = getCookie("buyerId");
    if (buyerid) {
      agent.Basket.get().then(response=>response.data)
        .then((basket) => {
          // console.log(basket)
          dispatch(setBasket(basket));
        })
        .catch((error) => console.log(error));
    }
  }, [dispatch]);
  return (
    <DarkThemeProvider>
   
      <ToastContainer position="bottom-right"  hideProgressBar theme="colored"/>
        <CssBaseline />
        <Header />
        <Container sx={{padding:'.0em',ml:'1em',mr:'1em'}} maxWidth='xl' component= {Paper} variant='elevation'>
          <Outlet/>
        </Container>
       
    </DarkThemeProvider>
  );
}
export default App;
