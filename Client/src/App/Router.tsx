import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Catalog from "./features/Catalog/Catalog";
import ProductDetails from "./features/Catalog/ProductDetails";
import AboutPage from "./AboutUs/AboutPage";
import Contact_Page from "./AboutUs/Contact_Page";
import ServerError from "./Error/ServerError";
import NotFound from "./Error/NotFound";
import ErrorPage from "./Error/ErrorPage";
import agent from "./api/agent";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "catalog", element: <Catalog /> },
      {
        path: "catalog/:id",
        element: <ProductDetails />,
        loader: ({ params }) => {
            const d=params.id && parseInt(params.id);
          if (d) 
            return agent.Catalog.details(d);
          else
            return agent.TestErrors.get400Error();
        },
        errorElement:<ErrorPage/>
      },
      { path: "about", element: <AboutPage /> },
      { path: "contact", element: <Contact_Page /> },
      { path: "server-error", element: <ServerError /> },
      { path: "not-found", element: <NotFound /> },
    ],

    errorElement: <ErrorPage />,
  },
]);
