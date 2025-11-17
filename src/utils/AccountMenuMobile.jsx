import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Axios from "./Axios";
import { clearUser } from "../store/userSlice";
import toast from "react-hot-toast";
import { RxCross1 } from "react-icons/rx";

const AccountMenuMobile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state?.user);
  useEffect(() => {});
  console.log(user);

  const handleLogout = async () => {
    try {
      await Axios.post("/user/logout", {});
      dispatch(clearUser());
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      toast.success("Logged out successfully!");
      navigate("/login"); // ✅ redirect to login
    } catch (error) {
      toast.error("Logout failed!");
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="w-full h-[78vh] shadow-lg p-5 bg-white flex flex-col items-start  ">
      <div className="flex justify-end w-full" onClick={()=>window.history.back()}>
        <RxCross1 className="text-xl cursor-pointer" />
      </div>
      <div className="border-b border-gray-500  px-2">
        <p className="font-semibold ">My Account</p>
        <p className="text-sm text-gray-500 mb-2">{user.name}</p>
      </div>

      <p className=" text-sm  text-gray-500 py-1 hover:bg-amber-500 rounded-sm w-full mt-1 px-2 hover:text-white ">
        My orders
      </p>
      <p className=" text-sm  text-gray-500 py-1 hover:bg-amber-500 rounded-sm w-full mt-1 px-2 hover:text-white ">
        Save address
      </p>
      <p
        className=" text-sm  text-gray-500 py-1 hover:bg-amber-500 rounded-sm w-full mt-1 px-2 hover:text-white "
        onClick={handleLogout}
      >
        Logout
      </p>
    </div>
  );
};

export default AccountMenuMobile;
