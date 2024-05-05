import { CircularProgress, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Product } from '../../models/product'
import axios from 'axios'
// import React from 'react'

 function ProductDetails() {
    const {id}=useParams<{id:string}>()
    const [loading, setloading]=useState(true)
    const [product, setProduct]=useState<Product|null>(null); 
    useEffect(() => {axios.get(`https://localhost:7000/api/products/${id}`)
    .then((response) => setProduct(response.data)).catch(error=>console.log(error)).finally(()=>setloading(false));
},
[id],
 )
 if (loading)
    {
        return <CircularProgress/>
    }
 
if (product) {
  return (

    <Typography variant='h2'>{product.name}</Typography>
  )}
  return(
    <Typography variant='h2'>Product Not Found</Typography>
  )

}

export default ProductDetails