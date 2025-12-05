import React from "react";
import { useSelector } from "react-redux";

const Myorders = () => {
  const orderDetails = useSelector((state) => state.order.order);

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Header */}
      <div className="w-full p-4 bg-white shadow-md text-xl font-semibold">
        My Orders
      </div>

      {/* Orders */}
      <div className="p-6">
        {!orderDetails?.length ? (
          <div className="text-center text-gray-500 text-lg py-20">
            No orders found 😕
          </div>
        ) : (
          <div className="grid gap-6 max-w-3xl mx-auto">
            {orderDetails.map((order, index) => (
              <div
                key={index}
                className="bg-white p-5 rounded-xl shadow hover:shadow-md transition border"
              >
                <div className="flex gap-4 items-center">

                  {/* Product Image */}
                  <img
                    src={order.product_details.image[0]}
                    alt=""
                    className="w-20 h-20 rounded-lg object-cover border"
                  />

                  {/* Details */}
                  <div className="flex flex-col gap-1">
                    <p className="text-lg font-medium text-gray-800">
                      {order.product_details.name}
                    </p>

                    <p className="text-sm text-gray-500">
                      Order ID:{" "}
                      <span className="font-medium">{order.orderId}</span>
                    </p>

                    <p className="text-sm text-gray-600">
                      Address:{" "}
                      <span className="font-medium">
                        {order.delivery_address.address_line},{" "}
                        {order.delivery_address.city},{" "}
                        {order.delivery_address.state},{" "}
                        {order.delivery_address.pincode}
                      </span>
                    </p>

                    <p className="text-sm text-green-600 font-semibold">
                      Status: {order.payment_status}
                    </p>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Myorders;
