import {
  Box,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import {  useParams } from "react-router-dom";
//import { Product } from "../../models/product";
//import axios from 'axios'
//import agent from "../../api/agent";
//import NotFound from "../../Error/NotFound";
import LoadingComponent from "../Loading/LoadingComponent";
//import { BasketContext } from "../../context/BasketContext";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/stores/store";
import { addBasketItemAsync, removeBasketItemAsync, updateBasketItemAsync } from "../Basket/basketSlice";
import { currencyformat } from "../../util/util";
import { fetchProductAsync, productSelectors } from "./CatalogSlice";
import NotFound from "../../Error/NotFound";
import LoadButton from "../../util/LoadButton";
//import ErrorPage from "../../Error/ErrorPage";
// import React from 'react'

function ProductDetails() {
  // Parameters
  // const navigate=useNavigate()
  const dispatch:AppDispatch=useDispatch()
  const { basket,status:basketStatus} = useSelector((state:RootState)=>state.basket);
  const { id } = useParams<{ id: string }>();
  
  const isValid=!isNaN(Number(id)) && (Number.isInteger(Number(id)))
  //const [loading, setloading] = useState(true);
  const product=useSelector((state:RootState)=>isValid? productSelectors.selectById(state,Number(id)):null)
  const {status}=useSelector((state:RootState)=>state.catalog)
 // const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(0);
 // const [submitting, setSubmitting] = useState(false);
  const item = basket?.items.find((i) => i.productId == product?.id);
  
  useEffect(() => {
    if (item) setQuantity(item.quantity);
    if (!product)
      dispatch(fetchProductAsync(Number(id)))
        
  }, [id, item,dispatch,product]);

  /*Handles */
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const num: number = parseInt(event.target.value);
    if (num >= 0) {
      setQuantity(num);
      return;
    }
    setQuantity(0);
  };
  const handleOnClick = () => {
    if (!product) return;
   // setSubmitting(true);
    if (!item) {
      dispatch(addBasketItemAsync({productId:product.id,quantity}))
   //   setSubmitting(false);
      return;
    }
    
    if (quantity>0)
      {
        dispatch(updateBasketItemAsync({productId:product.id,quantity}))

      }
    else
        dispatch(removeBasketItemAsync({productId:product.id,quantity:item.quantity}))
    //  setSubmitting(false);
      
  };
  if (status.includes('pending')||status.includes('init')) {
    return <LoadingComponent message="Loading products"/>;
  }

   if (!product) {
    console.log("error")
      return <NotFound/>
   }
  return (
    <Grid container spacing={6}>
      <Grid item xs={6} sx={{ width: "90%" }}>
        <Box
          component="img"
          src={product.pictureUrl}
          alt={product.name}
          sx={{ width: "90%" }}
        />
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h3">{product.name}</Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="h4" color="secondary">
          {currencyformat(product.price)}
        </Typography>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>{product.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>{product.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>{product.type}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Quantity In Stock</TableCell>
                <TableCell>{product.quantityInStock}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container spacing={2} justifyContent="align">
          <Grid item xs={3}>
            <TextField
              variant="outlined"
              type="number"
              label="Quantity in Cart"
              fullWidth
              value={quantity}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={9}>
            <LoadButton
              onClick={handleOnClick}
              disabled={item? quantity==item.quantity : false}
              color={"primary"}
              size="large"
              loading={ (basketStatus.includes('pending'))}
              fullWidth
              variant="contained"
              sx={{ height: "50px" }}
            >
  {            item ? "Update Quantity" : "Add to Card"
            }
            </LoadButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ProductDetails;
