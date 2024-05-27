// import React from 'react'

//import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
//import { Button } from "@mui/material";
import agent from "../../api/agent";
import { Product } from "../../models/product";
import LoadingComponent from "../Loading/LoadingComponent";
import ProductList from "./ProductList";
//import {ProductList} from "ProductList";
import { useState, useEffect } from "react";

export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading]=useState(true)

  useEffect(() => {
    agent.Catalog.list().then(data => setProducts(data)).finally(()=>{setLoading(false)})
  }, []);
  if (loading)
    return <LoadingComponent message="Loading Catalog ..."/>

  return (
    <>
      <ProductList products={products} />
      {/* <Button variant="contained" color="primary"  onClick={addProduct}>Add Product</Button> */}
    </>
  );
}
