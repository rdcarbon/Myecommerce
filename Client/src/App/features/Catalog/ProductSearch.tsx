import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/stores/store";
import TextField from "@mui/material/TextField";
import { setProductParams } from "./CatalogSlice";
import { useState } from "react";
import {  IconButton, InputAdornment } from "@mui/material";
import { Search } from "@mui/icons-material";

export default function ProductSearch() {
  const { productParams } = useSelector((state: RootState) => state.catalog);
  const dispatch = useDispatch<AppDispatch>();
  const [searchTerm,setSearchTerm]=useState(productParams.searchTerm)
 
  return (
  
    <TextField 
        label="Search products" 
        variant="outlined" 
        fullWidth
        value={searchTerm||''}
         onChange={
             event=>{setSearchTerm(event.target.value)}
         }
         onKeyDown={(event)=> {
            if (event.key==='Enter')
                dispatch(setProductParams({searchTerm}))

         }}
         InputProps={ { endAdornment:(<InputAdornment position="end">
        <IconButton onClick={()=>dispatch(setProductParams({searchTerm:searchTerm}))}><Search/></IconButton>
         </InputAdornment>)}}
        />
         )
}
