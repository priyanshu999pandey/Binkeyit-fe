import React, { useState } from "react";
import { Link } from "react-router-dom";
import ValidUrlConvert from "../utils/ValidUrlConvert";
import Axios from "../utils/Axios";
import toast from "react-hot-toast";
import { handleAddItemCart } from "../store/cartProductSlice";
import { useDispatch } from "react-redux";
import { useGlobalContext } from "../provider/GlobalProvider";
import AddToCart from "./AddToCartButton";

const CardProduct = ({ data }) => {
  
  const url = `/product/${ValidUrlConvert(data?.name)}-${ValidUrlConvert(
    data?._id
  )}`;
  
  return (
    <Link
      to={url}
      className="border border-blue-100  grid gap-1 w-52  h-80 rounded p-4 "
    >
      <div className="min-h-25 bg-white">
        <img
          src={data.image[0]}
          className="h-full w-full object-scale-down   "
        />
      </div>
      <div className="  rounded-full w-fit px-4 py-1 text-green600 bg-green-200  text-sm ">
        10 min
      </div>
      <div className="text-sm line-clamp-2">{data.name}</div>
      <div className="text-sm mb-4 text-gray-400 ">{data.unit}</div>

      <div className="flex justify-between items-center">
        <div className=" font-semibold ">₹{data.price}.00</div>
       
         <AddToCart  data={data} />
      </div>
    </Link>
  );
};

export default CardProduct;
