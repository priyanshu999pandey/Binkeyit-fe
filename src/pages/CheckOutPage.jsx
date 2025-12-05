import React, { useState } from "react";
import { useGlobalContext } from "../provider/GlobalProvider";
import AddAddress from "../components/AddAddress";
import { useSelector } from "react-redux";
import Axios from "../utils/Axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
// NOTE: removed loadStripe import because we no longer use stripe.redirectToCheckout
// import {loadStripe} from "@stripe/stripe-js"

const CheckOutPage = () => {
  const { priceWithoutDiscount, price, cartQuantity, fetchCartData,fetchOrderDetails } =
    useGlobalContext();
  const navigate = useNavigate();
  const [openAddAddress, setOpenAddAddress] = useState(false);
  const addressList = useSelector((state) => state.address.address);
  const [selectedAddress, setSelectedAddress] = useState(0);
  const cartItemList = useSelector((state) => state.cart.cartItem);

  // DEBUG
  // console.log("cartItems", cartItemList);
  // console.log("cartItems", price);
  // console.log(addressList[selectedAddress]);

  const handleCashOnDelivery = async () => {
    try {
      const res = await Axios.post("/order/cash-on-delivery", {
        list_items: cartItemList,
        addressId: addressList[selectedAddress]?._id,
        subTotalAmt: price,
        totalAmt: price,
      });
      console.log(res);
      if (res?.data?.success) {
        toast.success("order successful");
        fetchCartData();
        fetchOrderDetails();
        navigate("/success", {
          state: {
            text: "order",
          },
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to place COD order");
    }
  };

  const handleOnlinePayment = async () => {
    try {
      // ---------- CLIENT-SIDE GUARDS (NEW) ----------
      // 1) ensure cart not empty
      if (!cartItemList || cartItemList.length === 0) {
        toast.error("Your cart is empty");
        return;
      }

      // 2) ensure address is selected
      if (!addressList[selectedAddress]) {
        toast.error("Please select an address");
        return;
      }

      // 3) minimum order guard (in rupees)
      // Stripe requires a minimum equivalent to $0.50; using a safe local minimum avoids conversion pitfalls.
      // I set this to ₹50. Change MIN_ORDER_RUPEES if you want a different threshold.
      const MIN_ORDER_RUPEES = 50;
      if (!price || Number(price) < MIN_ORDER_RUPEES) {
        toast.error(`Minimum order value is ₹${MIN_ORDER_RUPEES}. Add more items.`);
        return;
      }
      // ---------- end guards ----------

      // Create checkout session on your server
      const res = await Axios.post("/order/checkout", {
        list_items: cartItemList,
        addressId: addressList[selectedAddress]?._id,
        subTotalAmt: price,
        totalAmt: price,
      });

      console.log("Checkout create response:", res?.data);
      

      const session = res?.data;

      // Prefer session.url (current Stripe recommended approach). If your server
      // returns only id (old style) you should update the server to return url.
      if (session?.url) {
        // full page redirect to Stripe hosted Checkout
        window.location.href = session.url;
        return;
      }

      // fallback if server returned older session.id only
      if (session?.id) {
        // Option A: ask server to return session.url instead (preferred).
        // Option B: open a page that constructs a POST to Stripe to get URL;
        // but simplest explaination: update server to return session.url.
        toast.error("Payment session created but no redirect URL returned. Update server to return session.url");
        console.error("Session returned but no url:", session);
        return;
      }

      // unexpected
      toast.error("Failed to create checkout session");
      console.error("Unexpected session response:", session);
    } catch (error) {
      console.error("handleOnlinePayment error:", error);
      toast.error("Something went wrong while initiating payment");
    }
  };

  return (
    <div className="w-full  min-h-[78vh] flex bg-white ">
      {/* left */}
      <div className="w-[50%] p-4 ">
        <div>
          <h3 className="text-lg font-semibold">Choose your address</h3>
          <div
            className="w-full h-10 border-dashed border-2 border-blue-300 flex justify-center items-center my-5 "
            onClick={() => setOpenAddAddress(true)}
          >
            <p>Add address</p>
          </div>
        </div>
        <div className="flex flex-col gap-5 mt-5 w-full h-[55vh] overflow-hidden overflow-y-auto">
          {addressList.map((address, index) => {
            return (
              <label htmlFor={"selectedAddress" + index} key={address._id || index}>
                <div className="border border-green-400 bg-green-100 text-sm p-4 flex gap-1 hover:bg-green-200 ">
                  <div>
                    <input
                      type="radio"
                      value={index}
                      checked={selectedAddress === index}
                      onChange={() => setSelectedAddress(index)}
                      id={"selectedAddress" + index}
                      name="address"
                    />
                  </div>
                  <div>
                    <p>
                      {address.address_line}, {address.city}
                    </p>

                    <p>{address.state}</p>
                    <p>
                      {address.country}-{address.pincode}
                    </p>
                    <p>{address.mobile}</p>
                  </div>
                </div>
              </label>
            );
          })}
        </div>
      </div>
      <div className="h-[78vh]  border-r border-gray-200"></div>
      {/* right */}
      <div className="w-[50%]  p-4">
        <div>
          <h3 className="text-lg font-semibold mb-5">Summary</h3>
          <div>
            <div className="border border-green-200 p-2 rounded">
              <p>Bill details</p>

              <div className="p-2">
                <div className="flex justify-between text-xs">
                  <p>Total Price</p>
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
            <div
              onClick={handleOnlinePayment}
              className="w-full h-10 text-white bg-green-800 hover:bg-green-700  flex justify-center items-center rounded-md"
            >
              Online Payment
            </div>
            <div
              onClick={handleCashOnDelivery}
              className="w-full h-10 text-green-800 border-2  flex justify-center items-center rounded-md hover:text-white hover:bg-green-800"
            >
              Cash on Delivery
            </div>
          </div>
        </div>
      </div>
      {openAddAddress && <AddAddress close={setOpenAddAddress} />}
    </div>
  );
};

export default CheckOutPage;
