import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const OrderSuccess = () => {
  const location = useLocation()
  console.log(location);
  
    

  return (
    <div className='flex justify-center items-center w-full h-[78vh] p-4 rounded-md bg-white'>
      <div className='w-full max-w-sm bg-green-200 h-90 p-4 flex flex-col items-center justify-center gap-4 '>
        <p className='text-green-500 text-2xl'> {location?.state?.text ? location?.state?.text: "payment"} Successfull !!</p>
         <Link to={"/"} className='border border-green-500 px-4 py-2 text-green-500 hover:text-white hover:bg-green-900' >Go To Home</Link>
      </div>
    </div>
  )
}

export default OrderSuccess