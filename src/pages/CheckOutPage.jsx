import React, { useState } from "react";
import { useGlobalContext } from "../provider/GlobalProvider";
import AddAddress from "../components/AddAddress";

const CheckOutPage = () => {
  const { priceWithoutDiscount, price, cartQuantity } = useGlobalContext();
  const [openAddAddress,setOpenAddAddress] = useState(false)
  return (
    <div className="w-full  min-h-[78vh] flex  bg-white  ">
      {/* left */}
      <div className="w-[50%]  p-4 ">
        <div>
          <h3>Choose your address</h3>
          <div className="w-full h-10 border-dashed border-2 border-blue-300 flex justify-center items-center" onClick={()=> setOpenAddAddress(true)}>
            <p>Add address</p>
          </div>
        </div>
      </div> 
      <div className="h-[78vh]  border-r border-gray-200"></div>
      {/* right */}
      <div className="w-[50%]  p-4">
        <div>
          <h3>Summary</h3>
          <div>
            <div className="border border-green-200 p-2 rounded">
              <p>Bill details</p>

              <div className="p-2">
                <div className="flex justify-between text-xs">
                  <p>Total Price</p>
                  {/* <p>₹{}</p> */}
                  <p>₹{price}.00</p>
                </div>
                <div className="flex justify-between text-xs ">
                  <p>Delivery Charge</p>
                  <p>Free</p>
                </div>
                <div className="flex justify-between text-xs">
                  <p>Total Items</p>
                  <p>{cartQuantity} Items</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full my-2 flex flex-col gap-5  ">
             <div className="w-full h-10 text-white bg-green-800 hover:bg-green-700  flex justify-center items-center rounded-md">Online Payment</div>
             <div className="w-full h-10 text-green-800 border-2  flex justify-center items-center rounded-md">Cash on Delivery</div>
          </div>
        </div>
      </div>
      {
        openAddAddress && <AddAddress close={setOpenAddAddress} />
      }
    </div>
  );
};

export default CheckOutPage;
