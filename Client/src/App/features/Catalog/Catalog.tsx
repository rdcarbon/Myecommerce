// import React from 'react'

//import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
//import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
//import agent from "../../api/agent";
//import { Product } from "../../models/product";
import LoadingComponent from "../Loading/LoadingComponent";
import ProductList from "./ProductList";
//import {ProductList} from "ProductList";
import {  useEffect } from "react";
import { AppDispatch, RootState } from "../../redux/stores/store";
import { fetchProductsAsync, productSelectors } from "./CatalogSlice";

export default function Catalog() {
    const products=useSelector(productSelectors.selectAll)
    const {productsLoaded,status}=useSelector((state:RootState)=>state.catalog)
  //const [products, setProducts] = useState<Product[]>([]);
//  const [loading, setLoading]=useState(true)
  const dispatch=useDispatch<AppDispatch>();
  
  useEffect(()=>{
    if (!productsLoaded)
    dispatch(fetchProductsAsync())
  },[productsLoaded,dispatch])
/*   useEffect(() => {
  
    agent.Catalog.list().then(data => setProducts(data)).finally(()=>{setLoading(false)})
  },
   []
  ); */
  if (status.includes('pending'))
    return <LoadingComponent message="Loading Catalog ..."/>

  return (
    <>
      <ProductList products={products} />
      {/* <Button variant="contained" color="primary"  onClick={addProduct}>Add Product</Button> */}
    </>
  );
}
