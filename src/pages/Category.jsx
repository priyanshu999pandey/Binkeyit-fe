import React, { useEffect, useState } from "react";
import AddCategoryModal from "../components/AddCategoryModal";
import Axios from "../utils/Axios";
import EditCategoy from "../components/EditCategoy";
import EditCategory from "../components/EditCategoy";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removeCategory } from "../store/productSlics";



const Category = () => {
  const dispatch = useDispatch()
   const categoryData = useSelector((state)=>state.product.allCategory)
  // console.log(productData)
  const [openModal, setOpenModal] = useState(false);
  // const [categoryData, setCategoryData] = useState([]); // <-- changed null -> []
   
  //  setCategoryData(productData)
   console.log('data....',categoryData)
  const [editCategory, setEditCategory] = useState(false);
  const [cardData, setCardData] = useState({
    name: "",
    image: "",
  });

  // const fetchData = async () => {
  //   try {
  //     const res = await Axios.get("/category/fetch-category");
  //     console.log(res?.data?.data);
  //     console.log("before", categoryData);
  //     setCategoryData(res?.data?.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  

  // lock body scroll as before
  useEffect(() => {
    if (openModal || editCategory) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => { document.body.style.overflow = "auto"; };
  }, [openModal, editCategory]);

  const handleDeleteCategory = async (id) => {
    try {
      const res = await Axios.delete(`/category/delete-category/${id}`);
      if (res?.data?.success) {
        // update redux store so UI updates immediately
        dispatch(removeCategory(id));
        toast.success(res.data.message || "Deleted");
      } else {
        toast.error(res?.data?.message || "Failed to delete");
      }
    } catch (error) {
      toast.error("Failed to delete");
      console.error(error);
    }
  };

  return (
    <section >
      <div className="shadow-md p-4 flex justify-between items-center   ">
        <h1>Category</h1>
        <button
          onClick={() => setOpenModal(true)}
          className="border-yellow-500 border hover:bg-yellow-500 px-4 py-1 rounded-md text-sm"
        >
          Add Category
        </button>
      </div>
      <div className="p-4">
        {openModal && <AddCategoryModal close={setOpenModal} />}
        {
          editCategory && <EditCategory close={setEditCategory} cardData={cardData} />
        }
      </div>

      <div className="grid gap-8 grid-cols-2 md:grid-cols-4 lg:grid-cols-5 p-4 ">
        {categoryData &&
          categoryData.map((product, index) => {
            return (
              <div
                key={product._id ?? index}
                className=" h-65 flex justify-center items-center border border-blue-50 group shadow-md"
              >
                <div className=" ">
                  <img
                    src={product?.image}
                    className="w-35"
                    alt={product?.name || `category-${index}`}
                  />
                  <div className=" flex justify-between items-center gap-5 opacity-0 group-hover:opacity-100  transition-opacity duration-300">
                    <div className="bg-green-100 px-6 py-1 hover:bg-green-200 rounded">
                      <button
                        className="text-green-500"
                        onClick={() => {
                          setEditCategory(true);
                          setCardData({
                            name: product?.name,
                            image: product?.image,
                            id:product?._id
                          });
                        }}
                      >
                        Edit
                      </button>
                    </div>
                    <div className="bg-red-100 px-4 py-1 hover:bg-red-200 rounded">
                      <button className="text-red-500" onClick={()=>handleDeleteCategory(product?._id)} >Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </section>
  );
};

export default Category;
