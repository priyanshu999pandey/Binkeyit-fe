

import React, { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import Axios from "../utils/Axios";
import toast from "react-hot-toast";
import { use } from "react";
import Category from "../pages/Category";
import { useDispatch, useSelector } from "react-redux";
import { setsubCategory } from "../store/productSlics";

const AddSubCategoryModal = (props) => {
  const dispatch = useDispatch()
  const categoryList = useSelector((state)=>state.product.allCategory)
  const [data, setData] = useState({
    name: "",
    image: "",
    category:[],
  });

  const [preview, setPreview] = useState(null); // data url for preview
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { value, name } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImgChange = (e) => {
    setError("");
    console.log(e)
    const file = e.target.files?.[0];
    console.log(file)
    if (!file) return;


    setData((prev) => ({ ...prev, image: file }));

    // create preview
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!data.name?.trim()) {
      setError("Name is required.");
      return;
    }
    if (!data.image) {
      setError("Please choose an image.");
      return;
    }

    
  const ids = data.category.map(item => item._id);
       console.log(ids);
    
    const formData = new FormData();
    formData.append("name", data.name.trim());
    formData.append("image", data.image); // backend expects field 'image'
    formData.append("category", ids); // backend expects field 'image'

    try {
      setLoading(true);
      const res = await Axios.post("/subCategory/add-subCategory", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      dispatch(setsubCategory(res?.data?.data))
      // success
      console.log("Response:", res?.data.data);
      // optionally show toast here
      toast.success("sub Category created successfully")
      // reset and close modal
         
      setData({ name: "", image: "",category:[] });
      setPreview(null);
      props.close(false); // as in your original component
      
    } catch (err) {
      console.error(err);
      const msg = err?.response?.data?.message || "Upload failed. Try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSelectedCategory = (categoryId)=>{
    //  const categoryToDelete = data.category.find((cat)=> cat._id===categoryId)
      const afterDeletedSelectedCategory = data.category.filter(el => el._id !== categoryId);
      setData((prev)=>{
        return{
          ...prev,
          category:afterDeletedSelectedCategory
        }
      })
    

  }
 

  
//  console.log("subCategory Selcted Daata",data.category)
  return (
    <section className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="max-w-[70vw] w-full bg-white p-4 rounded shadow">
        <div className="flex justify-between items-center my-4">
          <h1 className="font-semibold">Sub Category</h1>
          <button onClick={() => props.close(false)}>
            <IoCloseSharp size={30} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="categoryName">
              Name:
            </label>
            <input
              type="text"
              id="categoryName"
              name="name"
              placeholder="Enter category Name"
              value={data.name}
              onChange={handleChange}
              className="focus:outline-none border-blue-300 border w-full rounded bg-slate-100 py-2 px-2"
            />
          </div>

          <div className="mb-4">
            <p className="mb-2">Image</p>

            <div className="w-full lg:w-50 h-50 flex justify-center items-center border border-blue-300 mb-3">
              {preview ? (
                // preview box
                // tailwind: object-contain so the image fits
                <img src={preview} alt="preview" className="max-h-40 object-fit" />
              ) : (
                <p className="text-sm text-gray-500">No image</p>
              )}
            </div>

            <div className="mb-5">
              {/* <label htmlFor="sc">Select Category</label> */}
              {/* display value */}
               <div className="flex justify-start items-center gap-2 my-5">
                 {
                data.category.map((selectedCat,ind)=>{
                  return(<div className="px-2 py-0.5 bg-blue-100 rounded flex justify-center items-center">
                      <p>{selectedCat?.name}</p>
                      <button onClick={()=>handleDeleteSelectedCategory(selectedCat._id)} >
                         <IoCloseSharp size={20}></IoCloseSharp>
                      </button>
                  </div>)
                })
               }
               </div>

              {/* display category */}
              <select className="w-full focus-within:outline-none border border-blue-300 bg-blue-100 py-1 px-2 rounded " id="sc"
                onChange={(e)=>{
                    const value = e.target.value;
                    const categoryDetail = categoryList.find((el)=>el._id == value);
                    setData((prev)=>{
                      return{
                        ...prev,
                        category:[...prev.category,categoryDetail]
                      }
                    })
                }}
              > 
                 <option value={""}  >Select category</option>
                 {
                  categoryList.map((cate,ind)=>{
                    return(<option value={cate?._id} >{cate?.name}</option>)
                  })
                 }
              </select>
            </div>

            <div className="flex items-center gap-3">
              <label htmlFor="categoryImage">
                <div
                  className={`text-center lg:w-50 mt-1 px-4 py-1 rounded cursor-pointer ${
                    !data.name ? "bg-gray-500" : "bg-yellow-500"
                  }`}
                >
                  Upload Image
                </div>
              </label>
              <input
                type="file"
                id="categoryImage"
                className="hidden"
                accept="image/*"
                onChange={handleImgChange}
              />

              {/* submit button */}
              <button
                type="submit"
                disabled={!data.name || !data.image || loading}
                className={`ml-2 px-4 py-1 rounded ${
                  !data.name || !data.image || loading ? "bg-gray-300" : "bg-blue-500 text-white"
                }`}
              >
                {loading ? "Uploading..." : "Save"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setData({ name: "", image: "" ,category:[]});
                  setPreview(null);
                  setError("");
                }}
                className="ml-2 px-4 py-1 rounded bg-red-200"
              >
                Reset
              </button>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
        </form>
      </div>
    </section>
  );
};

export default AddSubCategoryModal;

