import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { LuCircleUserRound } from "react-icons/lu";
import UserProfileAvatarEdit from "../components/UserProfileAvatarEdit";
import Axios from "../utils/Axios";
import { useDispatch } from "react-redux";
import { updateProfile } from "../store/userSlice";
import toast from "react-hot-toast";

const Profile = () => {
  const user = useSelector((state) => state?.user?.user);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const dispatch = useDispatch()

  // safe initial state; will be synced with user when available
  const [userdata, setUserData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    mobile: user?.mobile || "",
  });

  // sync userdata when user changes (e.g., after fetch)
  useEffect(() => {
    setUserData({
      name: user?.name || "",
      email: user?.email || "",
      mobile: user?.mobile || "",
    });
  }, [user]);

  // lock body scroll when modal is open
  useEffect(() => {
    if (isOpenModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpenModal]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async(e)=>{
    e.preventDefault();

    try {
      const res = await Axios.put("/update-profile",userdata,{
         headers: { "Content-Type": "application/json" },
      })

      console.log(res);
      dispatch(updateProfile(res.data.data))
      toast.success(res.data.message)

    } catch (error) {
      console.log(error)
      toast.error("not updated!!")
    }
  }

  return (
    <div className="p-10">
      <div>
        <div className="overflow-hidden">
          {user?.avatar ? (
            <img
              src={user?.avatar}
              className="rounded-full h-20 w-20 object-cover"
              alt="avatar"
            />
          ) : (
            <div className="rounded-full h-20 w-20 object-cover flex items-center justify-center">
              <LuCircleUserRound />
            </div>
          )}

          <button
            className="px-8 py-2 mt-4 border rounded-2xl border-yellow-500 bg-slate-100 hover:bg-amber-500"
            onClick={() => setIsOpenModal(!isOpenModal)}
          >
            Edit
          </button>
        </div>
      </div>

      <div className="z-20">
        {isOpenModal && (
          <UserProfileAvatarEdit setIsOpenModal={setIsOpenModal} />
        )}
      </div>

      <div className="my-5 space-y-4">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="name" className="block">
              Name :
            </label>
            <div className="border border-yellow-500 px-4 py-1 bg-slate-100 rounded-sm">
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                value={userdata.name}
                className="w-full text-gray-700 focus:outline-none"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block">
              Email :
            </label>
            <div className="border border-yellow-500 px-4 py-1 bg-slate-100rounded-sm bg-slate-100">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={userdata.email}
                className="w-full text-gray-700 focus:outline-none"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="mob" className="block">
              Mobile No :
            </label>
            <div className="border border-yellow-500 px-4 py-1 bg-slate-100 rounded-sm">
              <input
                type="tel"
                id="mob"
                name="mobile"
                placeholder="Enter your Mobile no"
                value={userdata.mobile}
                className="w-full text-gray-700 focus:outline-none"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="flex justify-center items-center rounded-sm my-4 border border-yellow-500 bg-slate-100 py-2 hover:bg-yellow-500">
            <button> submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
