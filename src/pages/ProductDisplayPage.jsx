import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import Axios from "../utils/Axios";
import { FaArrowRight } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa6";
import minute_delivery from "../assets/minute_delivery.png";
import Best_Prices_Offers from "../assets/Best_Prices_Offers.png";
import Wide_Assortment from "../assets/Wide_Assortment.png";
import { priceWithDiscount } from "../utils/Discount";

const ProductDisplayPage = () => {
  const containerScroll = useRef();

  const handleLeftScroll = () => {
    containerScroll.current.scrollLeft -= 100;
  };

  const handleRightScroll = () => {
    containerScroll.current.scrollLeft += 100;
  };
  const params = useParams();
  console.log("params", params);

  const [data, setData] = useState({
    name: "",
    image: [],
    price: null,
    stock: null,
    unit: null,
  });
  const [image, setImage] = useState(0);
  console.log("useStateData", data);

  const productId = params.product?.split("-").slice(-1)[0];
  // console.log("productId", productId);

  const fetchProductdetail = async () => {
    if (!productId) {
      console.warn("No productId yet, skipping fetch");
      return;
    }

    try {
      const res = await Axios.post("/product/get-productDetailById", {
        productId: productId,
      });

      // log full response

      // console.log("API response data:", res.data.data);

      setData({
        name: res?.data?.data?.name,
        image: res?.data?.data?.image,
        price: res?.data?.data?.price,
        stock: res?.data?.data?.stock,
        unit: res?.data?.data?.unit,
        discount: res?.data?.data?.discount,
        description: res?.data?.data?.description,
        more_details: res?.data?.data?.more_details,
      });

      // setImage(res?.data?.data?.image[0])

      // use res.data as needed
      // e.g. setProduct(res.data.data)
    } catch (error) {
      // Better error handling / logging
      console.error("fetchProductdetail error:", error);

      // If response exists, show backend message
      const serverMessage =
        error?.response?.data?.message || error?.response?.data || null;

      if (serverMessage) {
        toast.error(`Server: ${serverMessage}`);
      } else {
        // fallback to network/axios message
        toast.error(error?.message || "Failed to fetch data");
      }

      // Helpful debug hint in console
      if (error?.response) {
        console.log("Status:", error.response.status);
        console.log("Response body:", error.response.data);
      } else {
        console.log("No response (network error?)");
      }
    }
  };

  // fetch when productId becomes available or when it changes
  useEffect(() => {
    fetchProductdetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  return (
    <section className="flex flex-col w-screen h-full lg:flex-row px-4  bg-white ">
      <div className=" w-full px-4 flex justify-center items-center bg-white lg:w-[40%] ">
        <div>
          <div className="h-[40vh] w-auto  overflow-hidden  lg:h-[60vh]   ">
            <img
              src={data.image?.[image]}
              className="w-full h-full object-scale-down"
            />
          </div>
          <div className="flex justify-center items-center gap-5  ">
            {data.image.map((img, ind) => {
              return (
                <div
                  className={`w-5 h-5 rounded-4xl bg-slate-200 ${
                    image == ind && "bg-slate-300 "
                  }`}
                ></div>
              );
            })}
          </div>
          <div className="flex justify-center items-center relative p-8 ">
            <div
              className="  z-50  flex justify-center w-[80vw]   mx-4 items-center gap-8 px-4 flex-nowrap overflow-x-auto scrollbar-hide  lg:w-[30vw] scroll-smooth "
              ref={containerScroll}
            >
              {data.image.map((img, ind) => {
                return (
                  <div className="">
                    <div className="h-30 w-30  ">
                      <img
                        onClick={() => setImage(ind)}
                        src={img}
                        className="h-full w-full object-scale-down "
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className=" hidden  absolute w-full z-40     justify-between items-center  lg:flex     ">
              <button
                onClick={handleLeftScroll}
                className=" p-2 bg-slate-100 rounded-full "
              >
                <FaArrowLeft size={20} />
              </button>
              <button
                onClick={handleRightScroll}
                className=" p-2 bg-slate-100 rounded-full "
              >
                <FaArrowRight size={20} />
              </button>
            </div>
          </div>
          <div className="my-2 p-6 lg:p-2 ">
            <h3 className="font-semibold">Description: </h3>
            <p className="text-xs text-slate-600">{data.description}</p>
          </div>
          {data?.more_details &&
            Object.keys(data?.more_details).map((element, index) => {
              return (
                <div className="my-2 p-2">
                  <h3 className="font-semibold">{element} </h3>
                  <p className="text-xs text-slate-600">{data?.more_details[element]}</p>
                </div>
              );
            })}
        </div>
      </div>
      <div className="w-full lg:[60]  bg-slate-100">
        <div className="p-4">
          <div className="">
            <p className="px-4 py-1  text-sm w-fit rounded-full bg-green-200 text-green-600  ">
              10 Min
            </p>
            <h2 className="text-4xl font-semibold  ">{data.name}</h2>
            <p className="text-md mb-2 ">{data.unit}</p>
            <div className="w-full border-b  border-slate-300  my-5"></div>
            <div className="flex gap-4 items-center">
              <p className="text-center px-4 py-2 border border-slate-400  w-fit ">
                {" "}
                ₹{data.price}.00
              </p>
              <p className="line-through text-slate-400">
                {" "}
                ₹{priceWithDiscount(data.price, data.discount)}.00
              </p>
            </div>
            <p className=" mb-2   text-xl text-green-800">
              {data.discount}% <span className="text-sm">Discount</span>
            </p>
            <button className="bg-green-800 text-white px-8 rounded py-2 mt-2">
              Add
            </button>
          </div>
          <div className="mt-10 flex flex-col gap-3">
            <p className=" font-medium text-md">Why shop from binkeyit?</p>
            <div className="flex p-4 border border-slate-300 rounded">
              <img src={minute_delivery} className="h-20 " />
              <div className="p-2">
                <h4 className="text-md font-medium">Superfast Delivery</h4>
                <p className="text-sm text-slate-400">
                  Get your order delivered to your doorstep at the earliest from
                  dark stores near you
                </p>
              </div>
              <div></div>
            </div>
            <div className="flex p-4 border border-slate-300 rounded">
              <img src={Best_Prices_Offers} className="h-20 " />
              <div className="p-2">
                <h4 className="text-md font-medium">Best Prices & Offers</h4>
                <p className="text-sm text-slate-400">
                  Best price destination with offers directly from the
                  maufacturers
                </p>
              </div>
              <div></div>
            </div>
            <div className="flex p-4 border border-slate-300 rounded">
              <img src={Wide_Assortment} className="h-20 " />
              <div className="p-2">
                <h4 className="text-md font-medium">Wide Assortment</h4>
                <p className="text-sm text-slate-400">
                  choose from 5000+ products across food personal care household
                  & others categories
                </p>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDisplayPage;
