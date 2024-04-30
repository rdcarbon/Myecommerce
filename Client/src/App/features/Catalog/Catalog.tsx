// import React from 'react'

//import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
//import { Button } from "@mui/material";
import { Product } from "../../models/product";
import ProductList from "./ProductList";
//import {ProductList} from "ProductList";
import { useState, useEffect } from "react";


export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
  fetch("https://localhost:7000/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);
  return (
    <>
      <ProductList products={products}/>
      {/* <Button variant="contained" color="primary"  onClick={addProduct}>Add Product</Button> */}
    </>
  );
}
