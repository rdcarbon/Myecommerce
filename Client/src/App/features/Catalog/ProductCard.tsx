import { Product } from "../../models/product"
import {Card, CardMedia, CardContent, CardHeader, Avatar, CardActions, Button, Typography } from "@mui/material"
//import React from 'react'
interface Props{
    product:Product
    key:number;
}



export default function ProductCard({product}:Props) {
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
        <Typography variant="h6">${(product.price/100).toFixed(2)}</Typography>
        <Typography variant="h6" color='secondary.light'>{product.brand}/{product.type}</Typography>
    

    </CardContent>
    <CardActions>
        <Button variant='contained'>Add to Cart</Button>
        
        <Button variant='contained'>View</Button>
    </CardActions>
</Card>
  )
}