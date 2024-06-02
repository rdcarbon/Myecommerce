import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Basket } from "../../models/basket";
import agent from "../../api/agent";
import axios from "axios";

interface BasketState {
  basket: Basket | null;
  status: string;
}
const initialState: BasketState = {
  basket: null,
  status: "idle",
};
export const addBasketItemAsync = createAsyncThunk<
  Basket,
  { productId: number; quantity: number }
>("basket/addBasketItemAsync", async ({ productId, quantity },thunkAPI) => {
  try {
    const response=await agent.Basket.addItem(productId, quantity);
    return response.data;
  } catch (error) {
    console.error(error);
    if (axios.isAxiosError(error))    
    return thunkAPI.rejectWithValue({error: error.response?.data})
   return thunkAPI.rejectWithValue({message:"Unknown error"});
  }
});
export const removeBasketItemAsync = createAsyncThunk<
  void,
  { productId: number; quantity?: number }
>("basket/removeBasketItemAsync", async ({ productId, quantity = 1 }) => {
  try {
    await agent.Basket.removeItem(productId, quantity);
    return;
  } catch (error) {
    console.error(error);
  }
});
export const updateBasketItemAsync = createAsyncThunk<
  Basket,
  { productId: number; quantity: number }
>("basket/updateBasketItemAsync", async ({ productId, quantity }) => {
  try {
    const response=await agent.Basket.updateItem(productId, quantity);
    return response.data
  } catch (error) {
    console.log(error);
  }
});
export const basketSclice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    setBasket: (state, action: PayloadAction<Basket | null>) => {
      state.basket = action.payload;
    },
    /*         removeItem:(state,action:PayloadAction<{productId:number,quantity?:number}>)=>{
            const {productId,quantity=1}=action.payload;
            if (state.basket==undefined) return;
            const itemIndex=state.basket?.items.findIndex(i=>productId===i.productId)
            if ((itemIndex===undefined)|| (itemIndex<0)) return;
            state.basket.items[itemIndex].quantity-=quantity;
            if (state.basket.items[itemIndex].quantity<=0)
                state.basket.items.splice(itemIndex,1);          
        }, */
  },
  extraReducers: (builder) => {
    builder.addCase(addBasketItemAsync.pending, (state, action) => {
      console.log(action);
      state.status = "pendingAddItem";
    });
    builder.addCase(addBasketItemAsync.fulfilled, (state, action) => {
      console.log(action);
      state.basket = action.payload;
      state.status = "idle";
    });
    builder.addCase(addBasketItemAsync.rejected, (state,action) => {

      state.status = "idle";
      console.log(action.payload)
    });
    builder.addCase(removeBasketItemAsync.pending, (state, action) => {
      console.log(action);
      state.status =
        "pendingRemoveItem product" +
        action.meta.arg.productId +
        "quantity " +
        action.meta.arg.quantity;
    });
    builder.addCase(removeBasketItemAsync.fulfilled, (state, action) => {
      console.log(action);
      const { productId, quantity = 1 } = action.meta.arg;
      if (state.basket == undefined) return;
      const itemIndex = state.basket?.items.findIndex(
        (i) => productId === i.productId
      );
      if (itemIndex === undefined || itemIndex < 0) return;
      state.basket.items[itemIndex].quantity -= quantity;
      if (state.basket.items[itemIndex].quantity <= 0)
        state.basket.items.splice(itemIndex, 1);
      state.status = "idle";
    });
    builder.addCase(removeBasketItemAsync.rejected, (state, action) => {
      console.log(action.payload);
      state.status =
        "rejectedRemoveItem product" +
        action.meta.arg.productId +
        "quantity " +
        action.meta.arg.quantity;
        
    });
    builder.addCase(updateBasketItemAsync.pending, (state, action) => {
      state.status = "pendingUpdateItem" + action.meta.arg.productId;
    });

    builder.addCase(updateBasketItemAsync.fulfilled,(state,action)=>{
        state.basket=action.payload;
        state.status='idle'
    })

    builder.addCase(updateBasketItemAsync.rejected,(state)=>{
        state.status='idle'
    })
  },
});

export const { setBasket } = basketSclice.actions;
export const basketReducer = basketSclice.reducer;
