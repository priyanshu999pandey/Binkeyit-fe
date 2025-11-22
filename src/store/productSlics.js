import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const initialValue = {
  allCategory: [],
  subCategory: [],
  product: [],
  loadingCategory:false
};

const productSlice = createSlice({
  name: "product",
  initialState: initialValue,
  reducers: {
    setAllCategory: (state, action) => {
      const p = action.payload;
      if (Array.isArray(p)) {
        state.allCategory = [...p];
      } else {
        state.allCategory = [...state.allCategory, p];
      }
    },
    removeCategory:(state, action)=>{
      const id = action.payload;
      state.allCategory = state.allCategory.filter((cat) => cat._id !== id);
    },

    setsubCategory: (state, action) => {
      const p = action.payload  
      if (Array.isArray(p)) {
        state.subCategory = [...p];
      } else {
        state.subCategory = [...state.subCategory, p];
      }
    },
    removeSubCategory:(state, action)=>{
      console.log("redux",action.payload)
      const id = action.payload._id;
      state.subCategory = state.subCategory.filter((cat) => cat._id !== id);
      console.log("redux sub--",state.subCategory)
    },
    setLoadingCategory:(state,action)=>{
      state.loadingCategory = action.payload
    }
  },
});

export const {
  setAllCategory,
  removeCategory,
  setsubCategory,
  removeSubCategory,
  setLoadingCategory
} = productSlice.actions;
export default productSlice.reducer;
