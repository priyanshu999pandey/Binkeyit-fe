import React from "react";
import { useState } from "react";
import AddSubCategoryModal from "../components/AddSubCategoryModal";
import Axios from "../utils/Axios";
import { useEffect } from "react";
import DisplayTable from "../components/DisplayTable";
import { removeSubCategory, setsubCategory } from "../store/productSlics";
import { useDispatch, useSelector } from "react-redux";
import { createColumnHelper } from "@tanstack/react-table";
import { GoPencil } from "react-icons/go";
import { RiDeleteBin7Line } from "react-icons/ri";
import EditSubCategory from "../components/EditSubCategory";
import toast from "react-hot-toast";

const SubCategory = () => {
  const dispatch = useDispatch();
  // const Data = useSelector((state) => state.product.subCategory);
    const subCategories = useSelector((state) => state.product.subCategory);
    console.log("subCategorieds",subCategories)

 
  const [openModal, setOpenModal] = useState(false);
  const [editSubCategoryModal,setEditSubCategoryModal] = useState(false)
  const [editSubCategoryData,setEditSubCategorydata] = useState([])

  // const columnHelper = createColumnHelper();

  const fetchData = async () => {
    try {
      const res = await Axios.get("/subCategory/fetch-subCategory");
      console.log("aagaya data", res?.data?.data);
      dispatch(setsubCategory(res?.data?.data));
      // console.log("daaatata",)
      // setSubCategoryData(res?.data?.data)
     
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnClickEdit = (row)=>{
    setEditSubCategoryModal(true)
    setEditSubCategorydata(row?.original)
  }
   
  const handleOnClickDelete = async(row)=>{
    const deletdItemId= row.original._id
    // console.log(deletdItem)

    try {
      const res = await Axios.delete(`/subCategory/delete-subCategory/${deletdItemId}`)
      dispatch(removeSubCategory(res?.data?.data))
       console.log("deleted data ",res?.data?.data)
        toast.success(res?.data?.message)
    } catch (error) {
      
    }


  }

  useEffect(() => {
    fetchData();
  }, []);

  // const columns = [
  //   columnHelper.accessor("name", {
  //     header: "Name",
  //   }),
  //   columnHelper.accessor("image", {
  //     header: "Image",
  //     cell: ({row}) => {
        
  //       return<div className="flex justify-center items-center">
  //          <img src={row.original.image} alt="" className="w-10 h-10 " />
  //       </div>
  //     },
  //   }),
  //   columnHelper.accessor("category", {
  //     header: "Category",
  //     cell:({row})=>{
  //        console.log(row);
  //        return <div>
  //       {
           
  //         row.original.category.map((c,index)=>{
  //           console.log(c?.name)
  //           return(
  //             <div>
  //               <p className="text-black">{c?.name}</p>
  //             </div>
  //           )
  //         })
  //       }
  //       </div>
  //     }
  //   }),
  //   columnHelper.accessor("_id",{
  //     header:"Action",
  //      cell:({row})=>{
  //       console.log(row)
  //        return(<div className="flex justify-center items-center gap-3 ">
  //           <button onClick={()=>handleOnClickEdit(row)} className="p-2 bg-green-200 rounded-full text-green-400 hover:text-green-600"><GoPencil  size={20}/></button>
  //           <button onClick={()=>handleOnClickDelete(row)} className="p-2 bg-red-200 text-red-400 hover:text-red-600 rounded-full"><RiDeleteBin7Line size={20} /></button>
  //        </div>)
  //      }
  //   })
  // ];



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
        {openModal && <AddSubCategoryModal close={setOpenModal} />}
      </div>

      {/* {
            editSubCategoryModal && <EditSubCategory close={setEditSubCategoryModal} data={editSubCategoryData}  />
      } */}

      {/* <div className="">
         <div className="w-full p-4 ">
            {
              subCategories && <div className="flex justify-between border  bg-green-300  ">
                   <div className="w-[10%] border-r text-center ">Sr.No</div>
                   <div className="w-[25%] border-r text-center ">Name</div>
                   <div className="w-[15%] border-r text-center ">Image</div>
                   <div className="w-[25%] border-r text-center ">Category Name</div>
                   <div className="w-[25%] border-r text-center ">Actions</div>
                   
              </div>

              
            }
            <div>
              {
                subCategories.map((subC,index)=>{
                  return(<DisplayTable key={index} data={subC} index ={index} />)
                })
              }
            </div>
         </div>
      </div> */}

      <div className="w-full overflow-x-auto scrollbar-hide">
  <div className="min-w-[900px] p-4">
    {subCategories && (
      <div className="flex justify-between border bg-green-300">
        <div className="w-[10%] border-r text-center">Sr.No</div>
        <div className="w-[25%] border-r text-center">Name</div>
        <div className="w-[15%] border-r text-center">Image</div>
        <div className="w-[25%] border-r text-center">Category Name</div>
        <div className="w-[25%] border-r text-center">Actions</div>
      </div>
    )}

    <div>
      {subCategories.map((subC, index) => (
        <DisplayTable key={index} data={subC} index={index} />
      ))}
    </div>
  </div>
</div>


    </div>
  );
};

export default SubCategory;
