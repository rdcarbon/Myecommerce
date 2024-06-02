import React from "react";
import ReactDOM from "react-dom/client";
//import App from './App/App.tsx'
import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./App/Router.tsx";
//import { BasketProvider } from "./App/context/BasketContext.tsx";
//import { configureStore } from '@reduxjs/toolkit';
//import { configStore } from './App/store/configStore.ts';
import { Provider } from "react-redux";
import store from "./App/redux/stores/store.ts";
//import { fetchProductsAsync } from "./App/features/Catalog/CatalogSlice.ts";

//console.log(store.getState())

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <BasketProvider> */}
        <RouterProvider router={router} />
      {/* </BasketProvider> */}
    </Provider>
  </React.StrictMode>
);
