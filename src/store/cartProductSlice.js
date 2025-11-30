import { createSlice } from "@reduxjs/toolkit";

const initial = {
    cartItem : []
}

const cartSlice = createSlice({
    name:"cart",
    initialState:initial,
    reducers:{
        handleAddItemCart : (state,action)=>{
            state.cartItem = [...action.payload]
        }
    }
})

export const {handleAddItemCart} = cartSlice.actions

export  default cartSlice.reducer