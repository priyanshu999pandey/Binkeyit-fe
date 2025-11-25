import React, { useEffect } from 'react'
import banner from "../assets/banner.jpg"
import bannerMobile from "../assets/banner-mobile.jpg"
import { useSelector } from 'react-redux'
import ValidUrlConvert from '../utils/ValidUrlConvert'
import { Link, useNavigate } from 'react-router-dom'
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay'



const Home = () => {
  const navigate = useNavigate()
  const loading = useSelector((state)=>state.product.loadingCategory)
  const category = useSelector((state)=>state.product.allCategory)
  const subCategory = useSelector((state)=>state.product.subCategory)
  console.log("sub",subCategory)
  console.log("cat",category)
  console.log(loading)
  
  const handleRedirectProductListPage = (id,cat)=>{
   console.log(id,cat)
   const subCategoryId =  subCategory.find((sub)=>{

    const filterData = sub.category.some((el)=>{
      console.log("el",el)
      return el._id == id
    })
    return filterData ? filterData :null
   })
   console.log(subCategoryId)
   
   const check = ValidUrlConvert(cat)
   console.log(check);
   

   const url = `/${ValidUrlConvert(cat)}-${id}/${ValidUrlConvert(subCategoryId.name)}-${subCategoryId._id}`
   console.log(url);

   navigate(url)

  // console.log(cat);
  

  //  console.log("subCategoryId",subCategoryId)

  }
  

  return (
   <section className='p-4 bg-white'>
       <div>
           <div className={`min-h-48 w-full bg-white container mx-auto ${!banner && !bannerMobile?"animate-pulse":"animate-none" }`}>
            <img src={banner} className='hidden lg:block md:block  w-full h-full '  />
            <img src={bannerMobile} className=' lg:hidden md:hidden object-cover ' />
           </div>
       </div>

       <div className=''>
        {
          loading?(<div className='grid  grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 animate-pulse'>
              {
                new Array(12).fill(null).map((c,index)=>{
                  return(<div className='min-h-40  rounded flex flex-col gap-2' >
                    <div className='min-h-32 bg-blue-100 '></div>
                    <div className='min-h-8 bg-blue-100 '></div>
                  </div>)
                })
              }
          </div>):(<div className="grid  grid-cols-4 md:grid-cols-8 lg:grid-cols-10 gap-2 ">
            {
              category.map((cat,index)=>{
              
                return(<div className='h-full flex justify-center items-center ' onClick={()=>handleRedirectProductListPage(cat._id,cat.name)}>
                    <div className=''>
                      <img src={cat.image} className=' ' />
                    </div>
                </div>)
              })
            }
  
          </div>)
        }
       </div>

       {/* display product by category */}
       <div >
       {
        category.map((c,index)=>{
          return <CategoryWiseProductDisplay id={c._id} name={c.name} />
        })
       }
       </div>
   </section>
  )
}

export default Home