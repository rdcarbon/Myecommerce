import {
  Box,
  Button,
  CircularProgress,
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
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../models/product";
//import axios from 'axios'
import agent from "../../api/agent";
import NotFound from "../../Error/NotFound";
import LoadingComponent from "../Loading/LoadingComponent";
import { BasketContext } from "../../context/BasketContext";
// import React from 'react'

function ProductDetails() {
  const { basket, setBasket } = useContext(BasketContext);
  const { id } = useParams<{ id: string }>();
  const [loading, setloading] = useState(true);
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const item = basket?.items.find((i) => i.productId == product?.id);
  const [status, setStatus] = useState(200);
  useEffect(() => {
    if (item) setQuantity(item.quantity);
    id &&
      agent.Catalog.details(parseInt(id))
        .then((newproduct) => setProduct(newproduct))
        .catch((error) => {
          console.log(error);
          error.status && setStatus(error.status);
        })
        .finally(() => setloading(false));
  }, [id, item]);
  console.log(`status:${status}`);
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
    setSubmitting(true);
    if (!item) {
      agent.Basket.addItem(product.id, quantity)
        .then((basket) => setBasket(basket))
        .catch((error) => console.error(error))       
    }
    else
      {agent.Basket.updateItem(product.id, quantity)
        .then((basket) => setBasket(basket))
        .catch((error) => console.error(error))
      }
      setSubmitting(false);
      
  };
  if (loading) {
    return <LoadingComponent />;
  }

  if (!product) {
    return <NotFound />;
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
          ${(product.price / 100).toFixed(2)}
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
            <Button
              onClick={handleOnClick}
              disabled={item? quantity==item.quantity : false}
              color={"primary"}
              size="large"
              fullWidth
              variant="contained"
              sx={{ height: "50px" }}
            >{ (!submitting)?
              item ? "Update Quantity" : "Add to Card":<CircularProgress sx={{color:'white'}}/>
            }
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ProductDetails;
