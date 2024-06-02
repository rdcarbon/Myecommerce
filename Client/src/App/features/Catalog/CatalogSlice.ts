import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { Product } from "../../models/product";
import agent from "../../api/agent";
import { RootState } from "../../redux/stores/store";
import axios from "axios";
//import { redirect } from "react-router-dom";
//import axios,{ AxiosError } from "axios";
//import { AxiosError } from "axios";

export const productsAdapter = createEntityAdapter<Product>();

export const fetchProductsAsync = createAsyncThunk<Product[]>(
  "catalog/fetchproductsAsync",
  async (_,thunkAPI) => {
    try {
      const response=await agent.Catalog.list();
      return response.data
    } catch (error) {
      //console.log(error);
      if (axios.isAxiosError(error)) 
        return thunkAPI.rejectWithValue({error: error.response?.data})
        return thunkAPI.rejectWithValue({message:"Unknown error"});
    }
  }
);
export const fetchProductAsync = createAsyncThunk<Product, number>(
  "catalog/fetchproductAsync",
  async (id,thunkAPI) => {
    try {
      //console.log(id);
      const response=await agent.Catalog.details(id);
//const response=await axios.get(`http://localhost:5000/api/products/${id}`,{withCredentials:true})
      return response.data
    } catch (error) {

      if (axios.isAxiosError(error)) {
        console.error(error)
        return thunkAPI.rejectWithValue({error: error.response?.data})}
        return thunkAPI.rejectWithValue({message:"Unknown error"});
    }
  }
);
export const catalogSlice = createSlice({
  name: "catalog",
  initialState: productsAdapter.getInitialState({
    productsLoaded: false,
    status: "init",
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductsAsync.pending, (state) => {
      state.status = "pendingFetchProducts";
    });

    builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
      productsAdapter.setAll(state, action.payload);
      state.status = "fulfilled";
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
    builder.addCase(fetchProductAsync.rejected, (state) => {
      state.status = "idle";
    });
  },
});
export const productSelectors = productsAdapter.getSelectors(
  (state: RootState) => state.catalog
);
