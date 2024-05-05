//import React from 'react'
import { Product } from "../../models/product";
import { Grid } from "@mui/material"; //  List,Avatar,ListItem, ListItemAvatar, ListItemText

import ProductCard from "./ProductCard";
type Props = { products: Product[] };
export default function ProductList({ products }: Props) {
  return (
    <Grid container={true} spacing={4}>
      {products.map((product: Product) => (
        <Grid item key={product.id} xs={3}>
         <li> <ProductCard key={product.id} product={product} /></li>
        </Grid>
      ))}
    </Grid>
  );
}
