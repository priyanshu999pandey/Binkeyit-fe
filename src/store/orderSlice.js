import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
    order:[]
}

const orderSlice = createSlice({
    name:"order",
    initialState:initialValue,
    reducers:{
        setOrder:(state,actions)=>{
            state.order = [...actions.payload]
        }
    }
})

export const {setOrder} = orderSlice.actions;

export default orderSlice.reducer
