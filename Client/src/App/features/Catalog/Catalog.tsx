// import React from 'react'

//import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
//import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
//import agent from "../../api/agent";
//import { Product } from "../../models/product";
import LoadingComponent from "../Loading/LoadingComponent";
import ProductList from "./ProductList";
//import {ProductList} from "ProductList";
import { useEffect } from "react";
import { AppDispatch, RootState } from "../../redux/stores/store";
import {
  fetchFilters,
  fetchProductsAsync,
  productSelectors,

  setPageNumber,
  setProductParams,
} from "./CatalogSlice";
import Grid from "@mui/material/Grid";
import {
  Paper,
} from "@mui/material";
import ProductSearch from "./ProductSearch";
import RadioButtonGroup from "../../components/RadioButtonGroup";
import CheckboxButtons from "../../components/CheckboxButtons";
import AddPagination from "../../components/AddPagination";
//import { CheckBox } from "@mui/icons-material";
const sortOptions = [
  { value: "name", label: "Alphabetical" },
  { value: "priceDesc", label: "Price - High to low" },
  { value: "price", label: "Price - Low to high" },
];

export default function Catalog() {
  const products = useSelector(productSelectors.selectAll);
  const { productsLoaded, filtersLoaded, brands, types,productParams,metaData } = useSelector(
    (state: RootState) => state.catalog
  );
  // const [checked,setChecked]=useState(0)
  //const [products, setProducts] = useState<Product[]>([]);
  //  const [loading, setLoading]=useState(true)
  const dispatch = useDispatch<AppDispatch>();
  //const [searchTerm,setSearchTerm]=useState('')
  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProductsAsync());
  }, [productsLoaded, dispatch]);
  useEffect(() => {

  if (!filtersLoaded){ 
      dispatch(fetchFilters());}
}, [filtersLoaded, dispatch]);
 
  /*   useEffect(() => {
  
    agent.Catalog.list().then(data => setProducts(data)).finally(()=>{setLoading(false)})
  },
   []
  ); */
  if (!filtersLoaded)
    return <LoadingComponent message="Loading Catalog ..." />;

  return (
    <Grid container columnSpacing={4}>
      <Grid key="CatalogSidebar" item xs={3}>
        <Paper sx={{ mb: 2 }}>
          <ProductSearch />
        </Paper>

        <Paper sx={{ mb: 2, p: 2 }}>
          <RadioButtonGroup 
          selectedValue={productParams.orderBy} 
          options={sortOptions} 
          onChange={(event)=>{dispatch(setProductParams({orderBy:event.target.value}))}}/>
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
        <CheckboxButtons items={brands} checked={productParams.brands||[]} onChange={(items:string[])=>{
          dispatch(setProductParams({brands:items}))}}/>
     
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
    <CheckboxButtons items={types} checked={productParams.types||[]} onChange={(items:string[])=>dispatch(setProductParams({types:items}))}/>
        </Paper>
      </Grid>
      <Grid key={"ProductList"} item xs={9}>
        <ProductList products={products} />
      </Grid>
      <Grid key="Catalog sidebar2" item xs={3}></Grid>
      <Grid key="Pagination" item xs={9}>
{metaData&& <AddPagination metaData={metaData} onPageChange={(page:number)=>dispatch(setPageNumber({pageNumber:page}))}/>}
      </Grid>
      {/* <Button variant="contained" color="primary"  onClick={addProduct}>Add Product</Button> */}
    </Grid>
  );
}
