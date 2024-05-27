import { NavLink } from "react-router-dom";
import { Product } from "../../models/product"
import {Card, CardMedia, CardContent, CardHeader, Avatar, CardActions, Button, Typography } from "@mui/material"
import agent from "../../api/agent";
import { BasketContext } from "../../context/BasketContext";
import { useContext } from "react";
import { currencyformat } from "../../util/util";
//import ProductDetails from "./ProductDetails";
//import React from 'react'
interface Props{
    product:Product
    key:number;
}



export default function ProductCard({product}:Props) {
    const {setBasket}=useContext(BasketContext)
    const handleaddtocart=()=>{
        agent.Basket.addItem(product.id)
        .then(bask=>setBasket(bask))
        .catch(error=>console.log(error))

    }
  return (
<Card >
    <CardHeader
        avatar={<Avatar sx={{bgcolor:'secondary.main'}}>{product.name.charAt(0).toUpperCase()}</Avatar>}
        title={product.name}
        titleTypographyProps={{sx:{fontWeight: 'bold', color:'primary.light'} }}
        />
       
    <CardMedia 
        // component="img" 
        image={product.pictureUrl}
        sx={{height:140, backgroundSize:"contain",bgcolor:'primary.light'}}
        title={product.name}
    
         />
    <CardContent>
        <Typography variant="h6">{currencyformat(product.price)}</Typography>
        <Typography variant="h6" color='secondary.light'>{product.brand}/{product.type}</Typography>
    

    </CardContent>
    <CardActions>
        <Button variant='contained' onClick={handleaddtocart}>Add to Cart</Button>
        
        <Button variant='contained' component={NavLink} to={'/Catalog/'+product.id}>View</Button>
    </CardActions>
</Card>
  )
}