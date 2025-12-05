import React, { useState } from "react";
import { useSelector } from "react-redux";
import AddAddress from "../components/AddAddress";
import EditAddress from "../components/EditAddress";
import { RiDeleteBin3Line } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import Axios from "../utils/Axios";
import toast from "react-hot-toast";
import { useGlobalContext } from "../provider/GlobalProvider";

/**
 * Beautiful, responsive Address page (radio removed)
 */
const Address = () => {
  const addressList = useSelector((state) => state.address.address) || [];
  const { fetchAddress } = useGlobalContext();

  const [openAddress, setOpenAddress] = useState(false);
  const [editAddress, setEditAddress] = useState(false);
  const [editData, setEditData] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Delete with confirmation modal
  const handleDeleteAddress = async (addressId) => {
    try {
      setDeleting(true);
      const res = await Axios.delete("/address/delete-address", {
        data: { addressId },
      });

      if (res?.data?.success) {
        fetchAddress();
        toast.success(res?.data?.message || "Address deleted");
        setConfirmDeleteId(null);
      } else {
        toast.error(res?.data?.message || "Could not delete address");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 p-4 bg-white shadow-sm border-b">
        <div>
          <h1 className="text-lg font-semibold text-gray-800">Manage Addresses</h1>
          <p className="text-sm text-gray-500">Your saved delivery addresses</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setOpenAddress(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-400 hover:bg-amber-500 text-white rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
            aria-label="Add new address"
          >
            Add Address
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 max-w-5xl mx-auto">
        {/* Empty state */}
        {!addressList?.length ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-xl">
              <p className="text-gray-600 text-lg mb-4">No addresses yet</p>
              <button
                onClick={() => setOpenAddress(true)}
                className="px-4 py-2 bg-amber-400 hover:bg-amber-500 text-white rounded-full"
              >
                Add your first address
              </button>
            </div>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {addressList.map((address, idx) => (
              <div
                key={address._id || idx}
                className="relative bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-sm font-medium text-gray-800">
                        {address.address_title || `Address ${idx + 1}`}
                      </h3>

                      {address.isDefault && (
                        <span className="inline-flex items-center text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full">
                          Default
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                      {address.address_line}
                      <br />
                      {address.city} • {address.state} • {address.pincode}
                      <br />
                      {address.country}
                      <br />
                      <span className="text-sm text-gray-700 font-medium">
                        {address.mobile}
                      </span>
                    </p>

                    <div className="flex items-center gap-2 mt-3">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setEditData(address);
                          setEditAddress(true);
                        }}
                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-700 hover:bg-emerald-600 hover:text-white transition focus:outline-none focus:ring-2 focus:ring-emerald-200"
                        aria-label="Edit address"
                        title="Edit"
                      >
                        <FaEdit />
                        <span className="text-sm">Edit</span>
                      </button>

                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setConfirmDeleteId(address._id);
                        }}
                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-50 border border-red-200 rounded-lg text-red-700 hover:bg-red-600 hover:text-white transition focus:outline-none focus:ring-2 focus:ring-red-200"
                        aria-label="Delete address"
                        title="Delete"
                      >
                        <RiDeleteBin3Line />
                        <span className="text-sm">Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* AddAddress modal (your existing component) */}
      {openAddress && <AddAddress close={setOpenAddress} />}

      {/* EditAddress modal */}
      {editAddress && <EditAddress close={setEditAddress} Data={editData} />}

      {/* Delete confirmation modal */}
      {confirmDeleteId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800">Delete address?</h3>
            <p className="text-sm text-gray-600 mt-2">
              Are you sure you want to delete this address? This action cannot be undone.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteAddress(confirmDeleteId)}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Address;
