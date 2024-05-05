import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Catalog from "./features/Catalog/Catalog";
import ProductDetails from "./features/Catalog/ProductDetails"
import AboutPage from "./AboutUs/AboutPage";
import Contact_Page from "./AboutUs/Contact_Page";
export const router=createBrowserRouter([
    
   {
    path:'/',
    element: <App/>,
    children:[
        {path:'catalog',element:<Catalog/>},
        {path:'catalog/:id',element:<ProductDetails/>},
        {path:'about',element:<AboutPage/>},
        {path:'contact',element:<Contact_Page/>},
    ]
}
]
)