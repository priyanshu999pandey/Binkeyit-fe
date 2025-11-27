import React, { useEffect, useState } from 'react'
import Axios from '../utils/Axios'
import toast from 'react-hot-toast'
import Category from './Category'
import { useParams } from 'react-router-dom'
import CardProduct from '../components/CardProduct'

const Product = () => {

  const params = useParams()
  const [data,setData] = useState([])

  const categoryId = params.category.split("-").slice(-1)[0];
  const name = params.category.split("-").slice(0,6).join(" ");
  // console.log("categoryId-----",name);
  

  const fetchAllProduct = async()=>{
    try {
      
      const res = await Axios.post("/product/get-AllProductByCategory",{categoryId})

      console.log("data",res?.data.data);
      setData(res?.data.data)
      
      
    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(()=>{
    fetchAllProduct()
  },[])
  
    
    
  return (
    <section className='bg-white'>
       <div className='w-full text-center h-[10] shadow bg-white p-4'>
           <p className='text-2xl font-semibold'>{name}</p>
       </div>
     <div className='flex justify-center items-center my-5'>
         <div className='  grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-5  '>
        {
           data.map((p,index)=>{
            return(
              <CardProduct key={"product"+index}  data={p} />
            )
           })
        }
       </div>
     </div>
    </section>
  )
}

export default Product