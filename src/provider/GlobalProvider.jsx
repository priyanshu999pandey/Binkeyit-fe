import { createContext, useContext, useEffect, useState } from "react";
import Axios from "../utils/Axios";
import { handleAddItemCart } from "../store/cartProductSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {priceWithDiscount} from "../utils/Discount.js"

export const GlobalContext = createContext(null);
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const dispatch = useDispatch();
    const cartItem = useSelector((state)=>state.cart.cartItem)
  const [cartQuantity,setCartQuantity] = useState(0)
  const [price,setPrice] = useState(0)

  const fetchCartData = async () => {
    try {
      const res = await Axios.get("/cart/get");
      // console.log("cart Data",res.data.cartItems)
      dispatch(handleAddItemCart(res.data.cartItems));
    } catch (error) {
      console.log(error);
    }
  };
  
  const updateCartItem = async (id, qty) => {
    try {
      const res = await Axios.put("/cart/update-qty", {
        _id: id,
        qty: qty,
      });
      if (res.data.success) {
        //  toast.success("Item added sucessFully !!")
        fetchCartData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCartItem = async (cartId) => {
    console.log("cartId", cartId);
    try {
      const res = await Axios.delete("/cart/delete-cart-item", {
        data: { id: cartId },
      });

      if (res.data.success) {
        fetchCartData();
        toast.success("Item removed Successfully");
        
      }
    } catch (error) {
      console.log(error);
    }
  };

  const calculateCartItem = ()=>{
  
      const cartQty = cartItem.reduce((accu,item)=>{
        return accu + item.quantity
       },0)
      const finalPrice = cartItem.reduce((accu,item)=>{
        // console.log("item",item.quantity);
        
        return accu + ( priceWithDiscount(item.productId.price,item.productId.discount)* item.quantity )
        
       },0)
      //  console.log("cartQYT",cartQty)
       console.log("price",finalPrice)
  
       setCartQuantity(cartQty)
       setPrice(finalPrice)
 }
  
    useEffect(()=>{
         calculateCartItem()
    },[cartItem])

    useEffect(() => {
        fetchCartData();
    },[]);

  return (
    <GlobalContext.Provider
      value={{
        fetchCartData,
        updateCartItem,
        deleteCartItem,
        cartQuantity,
        price,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
