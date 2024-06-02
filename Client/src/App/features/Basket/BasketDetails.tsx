import {  useState } from "react";
//import { BasketContext } from "../../context/BasketContext";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  //TableFooter,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Add, Delete, Remove } from "@mui/icons-material";
import BasketSummary from "./BasketSummary";
//import agent from "../../api/agent";
import { currencyformat } from "../../util/util";
import {  NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/stores/store";
import { addBasketItemAsync, removeBasketItemAsync } from "./basketSlice";

export default function BasketDetails() {
  const dispatch: AppDispatch = useDispatch();
  const {basket,status} = useSelector((state:RootState)=>state.basket)
  const [productId, setProductId] = useState(0);
  
  //const { basket, setBasket, removeitem } = useContext(BasketContext);
  const handleadditem = (id: number) => {
    /* setStatus({ loading: true, name: id });
    agent.Basket.addItem(id)
      .then((basket) => dispatch(setBasket(basket)))
      .catch((error) => console.log(error))
      .finally(() => setStatus({ loading: false, name: 0 })); */
      setProductId(id)
      dispatch(addBasketItemAsync({productId:id,quantity:1}))
  };
  const handleremoveitem = (productId: number, quantity = 1) => {
   /*  setStatus({ loading: true, name: productId });
    agent.Basket.removeItem(productId, quantity)
      .then(() => dispatch(removeItem({productId, quantity})))
      .catch((error) => console.log(error))
      .finally(() => setStatus({ loading: false, name: 0 })); */
      setProductId(productId)
      dispatch(removeBasketItemAsync({productId,quantity}))
    };
  const basketTotal: number = basket
    ? basket.items.reduce(
        (sum, item) => sum + (item.price * item.quantity) / 100,
        0
      )
    : 0;
if (!basket || basket.items.length==0) return <Typography variant="h6"> Basket is empty</Typography>
  return (
    <>
      <TableContainer component={Paper} variant="outlined">
        <Table>
          <TableHead>
            <TableRow key="Basket Header">
              <TableCell>Product</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Unit Price</TableCell>
              <TableCell>Sub Total</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basket?.items.map((item) => (
              <TableRow key={item.productId}>
                <TableCell>
                  <NavLink to={`../Catalog/${item.productId}`}>
                  <Box display="flex" alignItems="center">
                    <Box component="img" display={'inherit'} alignItems={'inherit'}
                      src={item.pictureUrl}
                      alt={item.name}
                      style={{ height: 50, marginRight: 20 }}
                    />
                    <span>{item.name}</span>
                  </Box>
                  </NavLink>
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleadditem(item.productId)}>
                    <Add color="primary" />
                  </IconButton>

                  {(status.includes('pending') && item.productId == productId) ? (
                    <CircularProgress size={16}/>
                  ) : (
                    item.quantity
                  )}

                  <IconButton onClick={() => handleremoveitem(item.productId)}>
                    <Remove color="error" />
                  </IconButton>
                </TableCell>

                <TableCell>{currencyformat(item.price)}</TableCell>
                <TableCell>
                  {currencyformat(item.price * item.quantity)}
                </TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    sx={{ backgroundColor: "" }}
                    onClick={() =>
                      handleremoveitem(item.productId, item.quantity)
                    }
                  >
                    <Delete color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          {/*           <TableFooter>
            <TableRow key="Footer">
              <TableCell>TOTAL</TableCell>
              <TableCell align="right">
                ${basket ? basketTotal.toFixed(2) : 0.0}
              </TableCell>
            </TableRow>
          </TableFooter> */}
        </Table>
      </TableContainer>
      <Grid container>
        <Grid item xs={8}></Grid>
        <Grid item xs={4}>
          <BasketSummary subtotal={basketTotal} />
          <Button variant='contained' size="large"   fullWidth component={NavLink}  to="/checkout">Checkout</Button>
          
          
        </Grid>
        
      </Grid>
      
    </>
  );
}
