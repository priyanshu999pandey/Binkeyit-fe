import React, { useEffect, useState } from "react";
import Axios from "../utils/Axios";
import toast from "react-hot-toast";
import ProductCardAdmin from "../components/ProductCardAdmin";

const ProductAdmin = () => {
  const [productData, setProductData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [search,setSearch] = useState("")

  const fetchProductData = async () => {
    try {
      const res = await Axios.post("/product/get-product", {
         page: page,
         limit:10,
         search:search }
        );

      console.log("fectch Product data", res?.data);
      setProductData(res?.data?.data)
      setPage(res?.data?.page)
      setTotalPage(res?.data?.totalNoPage)
      console.log(productData);
          

    } catch (error) {
      toast.error("error");
    }
  };
  useEffect(() => {
    fetchProductData();
  }, [page,search]);

  const handlePrevious = () =>{
     if(page > 1){
       setPage((prev)=> prev-1)
     }
  }
  const handleNext = () =>{
      if(page < totalPage){
        setPage((prev)=> prev+1)
      }
  }

  const handleChange = (e) =>{ 
      const value = e.target.value
      console.log(value);
      
      setSearch(value)
      setPage(1)
  }

  return (
    <section className="bg-slate-100">

      <div className="shadow-md p-4 flex justify-between items-center bg-white w-full">
        <h1 className="text font-medium">Upload product</h1>
         <input 
          type="text"
          placeholder="Search product here..."
          className="h-full px-4 py-2 focus-within: outline-none border border-blue-500 rounded bg-blue-50 "
          value={search}
          onChange={handleChange}
         />
         
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 p-4  gap-10 min-h-[78vh] ">
        {
          productData.map((product,index)=>{
            return(
              <ProductCardAdmin data={product} />
            )
          })
        }
      </div>

      <div className="flex justify-between items-center p-4">
        <div className=" text-center border w-30 border-yellow-500 py-2 px-4 rounded hover:bg-yellow-500" onClick={handlePrevious}>Previous</div>
        <div>{page}/{totalPage}</div>
        <div className="border text-center w-30 rounded border-yellow-500 px-4 py-2 hover:bg-yellow-500" onClick={handleNext} >Next</div>
      </div>

    </section>
  );
};

export default ProductAdmin;
