import React from 'react'
import { useState } from 'react';
import AddSubCategoryModal from '../components/AddSubCategoryModal';
import Axios from '../utils/Axios';
import { useEffect } from 'react';

const SubCategory = () => {
   const [openModal, setOpenModal] = useState(false);
   const [subCategoryData,setSubCategoryData] = useState([])

   const fetchData = async()=>{
     try {
         const res = await Axios.get("/subCategory/fetch-subCategory")
       console.log("aagaya data",res?.data?.data)
       setSubCategoryData(res?.data?.data)
     } catch (error) {
      console.log(error)
     }
   }

   useEffect(()=>{
         fetchData()
   },[])

  //  console.log("=====",subCategoryData)

  return (
    <div>
      <div className="shadow-md p-4 flex justify-between items-center   ">
        <h1> SubCategory</h1>
        <button
          onClick={() => setOpenModal(true)}
          className="border-yellow-500 border hover:bg-yellow-500 px-4 py-1 rounded-md text-sm"
        >
          Add sub Category
        </button>
        {
        openModal && <AddSubCategoryModal close={setOpenModal} />
      }

      
         
      </div>

      {/* <div className=' grid gap-8 grid-cols-2 md:grid-cols-4 lg:grid-cols-5 p-4 '>
         <div className='w-40 border '>
            {
              subCategoryData.map((item,index)=>{
                return(
                  <div className='relative bg-red-400'>
                     <img src={item?.image} className='mt-5' />
                     <p className='absolute bottom-10 left-10'>{item?.name}</p>
                  </div>
                )
              })
            }
          </div>
      </div> */}
    </div>

    )      
}

export default SubCategory