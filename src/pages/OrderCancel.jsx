import React from 'react'
import { Link } from 'react-router-dom'

const OrderCancel = () => {
  return (
    <div className='flex justify-center items-center w-full h-[78vh] p-4 rounded-md bg-white'>
      <div className='w-full max-w-sm bg-red-200 h-90 p-4 flex flex-col items-center justify-center gap-4 '>
        <p className='text-red-500 text-2xl'> Order Unsucessfull !!</p>
         <Link to={"/"} className='border border-red-500 px-4 py-2 text-red-500 hover:text-white hover:bg-red-900' >Go To Home</Link>
      </div>
    </div>
  )
}

export default OrderCancel