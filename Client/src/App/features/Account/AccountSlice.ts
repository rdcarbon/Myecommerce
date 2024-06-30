import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { User } from "../../models/User";
import { FieldValues } from "react-hook-form";
import agent from "../../api/agent";
import { isAxiosError } from "axios";
import { router } from "../../router/Router";
import { toast } from "react-toastify";
import { setBasket } from "../Basket/basketSlice";

interface AccountState{
    user:User|null
    status:"idle"|"signedin"|"rejected"
}
const initialState:AccountState={
    user:null,
    status:"idle"
}
export const signInUser=createAsyncThunk<User,FieldValues>('account/signInUser',
    async (data, thunkAPI) => {
        try {
            const response = await agent.Account.login(data);
            const {basket, ...user} = response.data;
            if (basket) thunkAPI.dispatch(setBasket(basket));
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data});
        }
    }
)
export const fetchCurrentUser=createAsyncThunk<User>(
'account/fetchCurrentUser',
async (_,thunkAPI)=>{

    const item=localStorage.getItem('user');
    if (item)
    thunkAPI.dispatch(setUser(JSON.parse(item)));
    try{
            const response=await agent.Account.currentuser()
            const {basket,...user}=response.data

            if (basket) thunkAPI.dispatch(setBasket(basket))
            localStorage.setItem('user',JSON.stringify(user));
            return user
    }
    catch(error){
        if (isAxiosError(error))    
            return thunkAPI.rejectWithValue({error: error.response?.data})
            return thunkAPI.rejectWithValue({error:"Unknown Error"})
        }
    }
    ,
    {
        condition:()=>{
            const item=localStorage.getItem('user')
            if (!item) return false;
            return true
        }
    }
    
)
export const accountSlice=createSlice({
    name:'account',
    initialState:initialState,
    reducers:{
        signOut:(state)=>{
            state.user=null;
            state.status="idle"
            localStorage.removeItem('user')
            router.navigate('/')
        },
        setUser:(state,action)=>{
            state.user=action.payload
           
        }
        
    },
    extraReducers: (builder=>{

        builder.addCase(fetchCurrentUser.rejected,(state)=>{
            state.user=null;
            state.status="idle"
            localStorage.removeItem('user')
            toast.error("Session expired - please login again");
            router.navigate("/")
        })
        builder.addCase(signInUser.rejected,(_state,action)=>{
            console.log( action.payload);
            _state.status="rejected";
        })
        builder.addMatcher(isAnyOf(signInUser.fulfilled,fetchCurrentUser.fulfilled),(state,action)=>{
            state.user=action.payload;
            state.status='signedin';
            
        })

    }
    )

}
)
export const {signOut,setUser}=accountSlice.actions