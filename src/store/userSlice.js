import {createSlice} from "@reduxjs/toolkit";

const initialValue = {
    user:null
}

const userSlice = createSlice({
    name:"user",
    initialState:initialValue,
    reducers:{
        setUserDetails : (state,action)=>{
            state.user = action.payload
        },
        updateAvatar:(state,action)=>{
            state.user.avatar = action.payload 
        },
        updateProfile:(state,action)=>{
          state.user.name = action.payload.name
          state.user.email = action.payload.email
          state.user.mobile = action.payload.mobile
        },
        clearUser : (state)=>{
            state.user = null
        }
    }
})

export const {setUserDetails,clearUser,updateAvatar,updateProfile} = userSlice.actions;

export default userSlice.reducer