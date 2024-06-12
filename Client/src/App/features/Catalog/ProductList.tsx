//import React from 'react'
import { Product } from "../../models/product";
import { Grid,} from "@mui/material"; //  List,Avatar,ListItem, ListItemAvatar, ListItemText

import ProductCard from "./ProductCard";
import { useAppSelector } from "../../redux/stores/store";
import ProductCardSkeleton from "./ProductCardSkeleton";
type Props = { products: Product[] };
export default function ProductList({ products }: Props) {
  const {productsLoaded}=useAppSelector(state=>state.catalog)
  return (
    <Grid container spacing={4}>
      {products.map((product: Product) => (
        <Grid item key={product.id} xs={6}  sm={6} md={4} lg={3}>
         {!productsLoaded?(
         <ProductCardSkeleton />):(<ProductCard key={product.id} product={product}/>)}
        </Grid>
      ))}
    </Grid>
  );
}
