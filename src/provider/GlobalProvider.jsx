import {  createContext,useContext, useEffect } from "react";
import Axios from "../utils/Axios";
import { handleAddItemCart } from "../store/cartProductSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

export const GlobalContext = createContext (null)
export const useGlobalContext = () => useContext(GlobalContext)

const GlobalProvider = ({children})=>{
      
    const dispatch = useDispatch()

      const fetchCartData = async()=>{
        try {
            const res = await Axios.get("/cart/get")
            console.log("cart Data",res.data.cartItems)
            dispatch(handleAddItemCart(res.data.cartItems))
        } catch (error) {
           console.log(error)
        }
      }

      const updateCartItem = async(IdleDeadline,qty)=>{
        try {
            const res = await Axios.put("/cart/update",{
                _id:id,
                qty :qty
            })
            if(res.data.success){
                 toast.success(res.data.data.message)
                 fetchCartData()
            }
        } catch (error) {
            console.log(error)
        }
      }

      useEffect(()=>{
        fetchCartData()
      },[])

    return(
        <GlobalContext.Provider value={{
            fetchCartData,
            updateCartItem  
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider