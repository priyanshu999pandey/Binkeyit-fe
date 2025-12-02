import React from 'react'
import { GiShoppingCart } from "react-icons/gi";
import { useGlobalContext } from '../provider/GlobalProvider';
import { GoArrowRight } from "react-icons/go";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AddToCartMobileLink = () => {
    const {cartQuantity,price} = useGlobalContext()
    const cartItem = useSelector((state)=>state.cart.cartItem)
    
  return ( 

  <>
  {
    cartItem[0] && (  <div className=' z-70 mb-4 bottom-10  bg-green-800 text-white sticky h-15 mx-4 rounded md:hidden lg:hidden '>
        <div className='w-full h-full flex items-center justify-between px-4'>
        <div className='flex gap-2'>
            <div className='flex items-center p-1 bg-green-600 rounded '>
              <GiShoppingCart className='animate-bounce' size={30} />
           </div>
           <div className='text-sm'>
               <p>{cartQuantity} Item</p>
               <p>₹{Number(price)}.00</p>
           </div>
        </div>
        <Link to="/cart" className='flex items-center gap-1 hover:text-yellow-500' >
          <p className='text-sm' >View Cart</p>
         <div  className=''>
             <GoArrowRight className='text-xl ' />
         </div>
        </Link>
       </div>
    </div>)
  }
  </>
    
  )
}

export default AddToCartMobileLink
   
