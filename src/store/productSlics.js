import {createSlice}  from "@reduxjs/toolkit"

const initialValue = {
    allCategory : [],
    subCategory : [],
    product:[],

}

const productSlice = createSlice({
    name:'product',
    initialState:initialValue,
    reducers:{
        setAllCategory :(state,action)=>{
            state.allCategory = action.payload
        },
          removeCategory(state, action) {
      const id = action.payload;
      state.allCategory = state.allCategory.filter(cat => cat._id !== id);
    },
    }
})

export const {setAllCategory,removeCategory}  = productSlice.actions;
export default productSlice.reducer