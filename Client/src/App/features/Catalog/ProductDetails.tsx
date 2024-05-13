import { CircularProgress, Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../models/product";
//import axios from 'axios'
import agent from "../../api/agent";
// import React from 'react'

function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [loading, setloading] = useState(true);
  const [product, setProduct] = useState<Product | null>(null);
  const [status,setStatus]=useState(200)
  useEffect(() => {
    id &&
      agent.Catalog.details(parseInt(id))
        .then((newproduct) => setProduct(newproduct))
        .catch(error => {console.log(error);error.status && setStatus(error.status);})
        .finally(() => setloading(false));
  }, [id]);
  console.log(`status:${status}`)
  if (loading) {
    return <CircularProgress />;
  }

  if (product) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={6}>
          <img
            src={product.pictureUrl}
            alt={product.name}
            style={{ width: "90%" }}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h3">{product.name}</Typography>
          <Divider sx={{mb:2}}/>
          <Typography variant="h4" color='secondary'>${(product.price/100).toFixed(2)}</Typography>
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
            </TableBody>
          </Table>
        </TableContainer>
        </Grid>
      </Grid>
    );
  }
  return <Typography variant="h3">Product Not Found</Typography>;
}

export default ProductDetails;
