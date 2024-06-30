import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Catalog from "../features/Catalog/Catalog";
import ProductDetails from "../features/Catalog/ProductDetails";
import AboutPage from "../features/AboutUs/AboutPage";
import Contact_Page from "../features/contact/Contact_Page";
import ServerError from "../Error/ServerError";
import NotFound from "../Error/NotFound";
import ErrorPage from "../Error/ErrorPage";
//import agent from "./api/agent";
import BasketDetails from "../features/Basket/BasketDetails";
import Checkout from "../features/Basket/Checkout";
import Login from "../features/Account/Login";
import Register from "../features/Account/Register";
import RequireAuth from "./RequireAuth";
// const children:RouteObject[]=[
// {
//   path:"/catalog",
//   element:<Catalog/>,
  
// },

// ]
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {element:<RequireAuth/>,children:[
        {path:"/checkout",element:<Checkout/>}]}
      ,
      { path: "catalog", element: <Catalog /> },
      {
        path: "catalog/:id",

        element: <ProductDetails />,
     /*    loader: async ({ params }) => {
          
            const d=params.id && parseInt(params.id);
          if (d) 
            return await agent.Catalog.details(d);
          else
            return await agent.TestErrors.get400Error();
        },  */
        errorElement:<ErrorPage/>
      },
      { path: "about", element: <AboutPage /> },
      { path: "contact", element: <Contact_Page /> },
      { path: "server-error", element: <ServerError /> },
      { path: "not-found", element: <NotFound /> },
      {path: "shopping-cart",element:<BasketDetails/>},
      {path:"checkout",element:<Checkout/>},
      {path:"login",element:<Login/>},
      {path:"register",element:<Register/>}
    ],

    errorElement: <ErrorPage />,
  },
]);
