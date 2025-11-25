import React from 'react'
import { Link } from 'react-router-dom'
import ValidUrlConvert from '../utils/ValidUrlConvert'

const CardProduct = ({data}) => {
    console.log("image",data)

    const url = `/product/${ValidUrlConvert(data.name)}-${ValidUrlConvert(data._id)}`
  return (
   <Link to={url} className='border border-blue-100  grid gap-1 w-52  h-80 rounded p-4 '>
        <div className='min-h-25 bg-white'>
            <img src={data.image[0]} className='h-full w-full object-scale-down   ' />
        </div>
        <div className='  text-green-800  text-sm '>10 min</div>
        <div className='text-sm line-clamp-2'>{data.name}</div>
        <div className='text-sm mb-4 text-gray-400 '>{data.unit}</div>

        <div className='flex justify-between items-center'>
           <div className=' font-semibold '>₹{data.price}.00</div>
           <div className='text-center text-white px-4 py-1 bg-green-800 hover:bg-green-500 rounded '> +  Add</div>
        </div>

    </Link>
  )
}

export default CardProduct