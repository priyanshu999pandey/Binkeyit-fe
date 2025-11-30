import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "../utils/Axios";
import CardLoading from "./CardLoading";
import CardProduct from "./CardProduct";
import { GoTriangleLeft, GoTriangleRight } from "react-icons/go";
import ValidUrlConvert from "../utils/ValidUrlConvert";

const CategoryWiseProductDisplay = ({ id,name }) => {
  const navigate = useNavigate()
  // console.log("id-name",id,name)
  const scrollRef = useRef()
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)

    const fetchCatgoryWiseProduct = async()=>{
        try {
            setLoading(true)
            const res = await Axios.post("/product/get-productByCategory",{id})
            // console.log("response",res.data)
            setData(res?.data?.data)
            setLoading(false)
            
        } catch (error) {
            console.log(error)
            
        }
    }

    useEffect(()=>{
        fetchCatgoryWiseProduct();
    },[])

    const handleScrollRight = ()=>{
      scrollRef.current.scrollLeft +=400
    }
    const handleScrollLeft = ()=>{
      scrollRef.current.scrollLeft -=400
    }

    // console.log("data",data);
    
    const loadingCardNo = new Array(7).fill(null)

  return (
    <div>
      <div className="flex justify-between items-center  relative">
        <h3 className="font-semibold lg:text-xl">{name}</h3>
        <Link to={`/${ValidUrlConvert(name)}-${id}`} className="text-green-600 hover:text-green-400">
          {" "}
          See All
        </Link>
      </div>

      <div>
         {
        loading && <div className="flex items-center gap-2 md:gap-4 lg:gap-6 flex-nowrap">
            {
                loadingCardNo.map((card,index)=>{
                   return <CardLoading key={index+"card"} />
                })
            }
        </div>
      }
      </div>

      <div className="flex items-center gap-2 md:gap-4 lg:gap-6 overflow-x-auto  p-4 scrollbar-hide  scroll-smooth" ref={scrollRef}>
            {
                data.map((p,index)=>{
                   return <div className="">
                    <CardProduct key={index+"product"} data={p} />
                   </div>
                })
            }
            <div className="absolute left-5 right-5  justify-between hidden md:flex lg:flex  ">
              <button className="bg-slate-100 rounded-full p-2"onClick={handleScrollLeft}>
                 <GoTriangleLeft size={30}  />
              </button>
              <button className="bg-slate-100 rounded-full p-2" onClick={handleScrollRight}> 
                <GoTriangleRight  size={30} />
              </button>
            </div>
        </div>
     
    </div>
  );
};

export default CategoryWiseProductDisplay;
