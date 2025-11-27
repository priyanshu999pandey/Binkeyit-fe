import React, { useState } from 'react'
import EditProductCardAdmin from './EditProductCardAdmin'

const ProductCardAdmin = ({data}) => {
  const productDetail = data
  const [close,setClose] = useState(false)
  console.log("product-data",productDetail);
  
  return (
    <div className=''>
        <div className='border border-yellow-500 bg-white rounded-md overflow-hidden '>
            <img src={data.image[0]} />
            <div className='flex flex-col justify-center items-center p-2'>
             <p className='text-sm text-center line-clamp-1'>{data?.name}</p>
            <p className='text-sm text-gray-500'>{data?.unit}</p>
           </div>

           <div className='flex w-full justify-between items-center p-4'>
            <button className=' text-xs bg-green-300 px-3 py-1   rounded text-green-700 border border-green-500 hover:bg-green-200 lg:text-md lg:px-5 lg:py-1 ' onClick={()=>setClose(true)} >Edit</button>
            <button className=' text-xs bg-red-300 px-1  py-1  rounded text-red-700 border border-red-500 hover:bg-green-red lg:text-md lg:px-3 lg:py-1 hover:bg-red-200 ' >Delete</button>
           </div>
        </div>

        {
             close && <EditProductCardAdmin close={setClose} productDetail={productDetail} />
        }

        
    </div>
  )
}

export default ProductCardAdmin