import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import Search from "./Search";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaRegCircleUser } from "react-icons/fa6";
import useMobile from "../hooks/useMobile";
import { GiShoppingCart } from "react-icons/gi";
import { useSelector } from "react-redux";
import { VscTriangleDown } from "react-icons/vsc";
import AccountMenu from "../utils/AccountMenu";
import { VscTriangleUp } from "react-icons/vsc";
import Axios from "../utils/Axios";

const Header = () => {
  const cartItem = useSelector((state)=>state.cart.cartItem)
  console.log(cartItem)
  // const c = useSelector((state)=>state.product.allCategory)
  // console.log("CartQUANTITY",cartItem);

  // const fetchproductPrice = async()=>{
  //   try {
  //      const res = await Axios.get("/cart/get")
  //      console.log("price res",res);
       
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  
  const navigate = useNavigate()

  const [isOpenMenu,setIsOpenMenu] = useState(false);
  const [isMobile] = useMobile();
  const [cartQuantity,setCartQuantity] = useState(0)
  const [price,setPrice] = useState(0)
  // console.log("isMObile", isMobile);

  const calculateCartItem = ()=>{

    const cartQty = cartItem.reduce((accu,item)=>{
      return accu + item.quantity
     },0)
    const finalPrice = cartItem.reduce((accu,item)=>{
      return accu + item.productId.price
     },0)
    //  console.log("cartQYT",cartQty)
    //  console.log("price",price)

     setCartQuantity(cartQty)
     setPrice(finalPrice)
  }

  useEffect(()=>{
       calculateCartItem()
      //  fetchproductPrice()
  },[cartItem])

  const location = useLocation();
  const { user } = useSelector((state) => state?.user);
  // console.log("user from store", user);

  const isSearhPage = location.pathname === "/search";
  // console.log(isSearhPage);

  const handleMenu = ()=>{
      if(!user._id){
         navigate("/login")
      }else{
         navigate("/user")
      }
  }

  return (
    <header className="  h-24 py-2 px-3 lg:h-20 lg:py-4 shadow-md sticky top-0 bg-slate-100 z-90">
      {!(isSearhPage && isMobile) && (
        <div className="  w-full container mx-auto  flex justify-between items-center">
          {/* logo */}
          <Link to={"/"} className="h-full flex justify-center items-center">
            <img
              src={logo}
              width={160}
              height={60}
              className="hidden lg:block"
            />
            <img src={logo} width={120} height={60} className="lg:hidden" />
          </Link>

          {/* searchBar */}
          <div className="hidden lg:block">
            <Search></Search>
          </div>
          {/* login my cart */}
          <div>
            {/* for mobile */}
            <div className="lg:hidden" onClick={handleMenu}>
              <FaRegCircleUser className="w-8 h-8" />
            </div>
            {/* for desktop */}

            <div className="hidden  lg:flex flex-row gap-10 justify-center items-center ">
              {
              
                  user?._id ?(
                    <div className="relative">
                       <div className="flex justify-center items-center gap-2 " onClick={()=>setIsOpenMenu(!isOpenMenu)} >
                            <p>Account</p>
                      {
                        isOpenMenu?(<VscTriangleUp className="w-7 h-7 "  />):(   <VscTriangleDown className="w-7 h-7 " />)
                      }
                       </div>
                       <div className="absolute top-10 left-[-40px] ">
                            {
                              isOpenMenu &&  <AccountMenu setIsOpenMenu={setIsOpenMenu} />
                            }
                       </div>
                    </div>
                  ):(
                  <Link
                    to={"/register"}
                    className="px-4 py-2 bg-slate-200 rounded-sm "
                  >
                    Login
                  </Link>
                  )
                 
              }

              <div className="flex justify-center items-center bg-green-800 text-white gap-2 px-4 py-2 rounded-sm hover:bg-green-700">
                <div className="animate-bounce ">
                  <GiShoppingCart size={28} />
                </div>
                {
                  cartItem[0]?(<div>
                    <p> {cartQuantity}</p>
                    <p>₹{Number(price)}.00</p>
                  </div>):
                  (<div>
                    <p>My cart</p>
                  </div>)
                }
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="py-2 lg:hidden">
        <Search />
      </div>
    </header>
  );
};

export default Header;
