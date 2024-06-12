import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { Product, ProductParams } from "../../models/product";
import agent from "../../api/agent";
import { RootState } from "../../redux/stores/store";
import axios from "axios";
import { MetaData } from "../../models/pagination";
//import { redirect } from "react-router-dom";
//import axios,{ AxiosError } from "axios";
//import { AxiosError } from "axios";
function getAxiosParams(productParams:ProductParams):URLSearchParams{
  const params=new URLSearchParams()
  
  params.append("orderBy",productParams.orderBy)
  params.append("pageNumber",productParams.pageNumber.toString())
  params.append("pageSize",productParams.pageSize.toString())

  productParams.searchTerm &&  params.append("searchTerm",productParams.searchTerm)
  productParams.brands && params.append("brands",productParams.brands.toString())
  productParams.types && params.append("types",productParams.types.toString())
  
  return params
}
interface CatalogState{
  productsLoaded:boolean
  filtersLoaded:boolean
  status:string
  brands:string[],
  types:string[],
  productParams:ProductParams
  metaData:MetaData|null
}
export const productsAdapter = createEntityAdapter<Product>();



export const fetchProductsAsync = createAsyncThunk<Product[],void,{state:RootState}>(
  "catalog/fetchProductsAsync",
  async (_, thunkAPI) => {
    const params=getAxiosParams(thunkAPI.getState().catalog.productParams)
    try {
      const response = await agent.Catalog.list(params);
      thunkAPI.dispatch(setMetaData(response.data.metaData))
    
      return response.data.items;
    } catch (error) {
      //console.log(error);
      if (axios.isAxiosError(error))
        return thunkAPI.rejectWithValue({ error: error.response?.data });
      return thunkAPI.rejectWithValue({ message: "Unknown error" });
    }
  }
);
export const fetchProductAsync = createAsyncThunk<Product, number>(
  "catalog/fetchProductAsync",
  async (id, thunkAPI) => {
    try {
      //console.log(id);
      const response = await agent.Catalog.details(id);
      //const response=await axios.get(`http://localhost:5000/api/products/${id}`,{withCredentials:true})
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error);
        return thunkAPI.rejectWithValue({ error: error.response?.data });
      }
      return thunkAPI.rejectWithValue({ message: "Unknown error" });
    }
  }
);
export const fetchFilters = createAsyncThunk<{
  brands: string[];
  types: string[];
}>("catalog/fetchFilters", async (_, thunkAPI) => {
  try {
    const response = await agent.Catalog.fetchFilters();
  
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error))
      return thunkAPI.rejectWithValue({ error: error.response?.data });
    return thunkAPI.rejectWithValue({ message: "Unknown error" });
  }
});
function initParams():ProductParams{
  return {
    orderBy:'name',
    pageNumber:1,
    pageSize:10,
    
  }
}


export const catalogSlice = createSlice({
  name: "catalog",
  initialState: productsAdapter.getInitialState<CatalogState>({
    productsLoaded: false,
    filtersLoaded: false,
    status: "init",
    brands: [] as string[],
    types: [] as string[],
    productParams:initParams(),
    metaData:null
  }),
  reducers: {
    setPageNumber: (state, action) => {
      state.productsLoaded = false;
      state.productParams = {...state.productParams, ...action.payload}
  },
  setMetaData: (state, action) => {
     
      state.metaData = action.payload
  },
    setProductParams:(state,action)=>{
      state.productsLoaded=false;
      state.productParams={...state.productParams,...action.payload,pageNumber: 1}
    },
    resetProductParams:(state)=>{
      state.productsLoaded=false;
      state.productParams=initParams();
      
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProductsAsync.pending, (state) => {
      state.status = "pendingFetchProducts";
    });

    builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
      productsAdapter.setAll(state, action.payload);
      state.status = "idle";
      state.productsLoaded = true;
    });

    builder.addCase(fetchProductsAsync.rejected, (state) => {
      state.status = "idle";
    });
    builder.addCase(fetchProductAsync.pending, (state) => {
      state.status = "pendingFechtProduct";
    });
    builder.addCase(fetchProductAsync.fulfilled, (state, action) => {
      productsAdapter.upsertOne(state, action.payload);
      state.status = "idle";
    });
    builder.addCase(fetchProductAsync.rejected, (state,action) => {
      state.status = "idle";
      console.log(action)
    });
    builder.addCase(fetchFilters.pending, (state) => {
      state.status = "pendingFetchfilters";
    });
    builder.addCase(fetchFilters.fulfilled, (state,action) => {
      state.brands=action.payload.brands
      state.types=action.payload.types
      state.status = "idle";
      state.filtersLoaded=true
    });
    builder.addCase(fetchFilters.rejected, (state,action) => {
      state.status = "idle";
      console.log(action.payload)

    });
  },
});
export const productSelectors = productsAdapter.getSelectors(
  (state: RootState) => state.catalog
);
export const  {setProductParams,resetProductParams,setMetaData,setPageNumber}=catalogSlice.actions
