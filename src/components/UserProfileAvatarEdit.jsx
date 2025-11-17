import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Axios from "../utils/Axios";
import { updateAvatar } from "../store/userSlice";
import toast from "react-hot-toast";

const UserProfileAvatarEdit = (props) => {
  const user = useSelector((state) => state?.user?.user);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      toast.error("Please select an image first!");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", selectedFile);

    try {
      setLoading(true);

      const res = await Axios.put("/user/upload-avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // pick avatar URL from common response shapes
      
      // console.log("response avatar:",res?.data?.data?.avatar);

      // dispatch the URL (not the whole response)
      dispatch(updateAvatar(res?.data?.data?.avatar));

      toast.success("Avatar uploaded successfully!");

      // close modal only on success
      if (props?.setIsOpenModal) props.setIsOpenModal(false);
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Upload failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="fixed inset-0 bg-black/80 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-[350px] flex flex-col items-center shadow-lg">
        <img
          src={user?.avatar}
          className="rounded-full w-24 h-24 object-cover mb-4"
          alt="avatar"
        />

        <form className="flex flex-col items-center w-full gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col w-full">
            <label className="font-semibold mb-1" htmlFor="upld">
              Select Avatar
            </label>

            <input
              type="file"
              id="upld"
              onChange={(e) => setSelectedFile(e.target.files[0])}
              className="border p-2 rounded w-full"
            />
          </div>

          <button
            disabled={loading}
            className="bg-yellow-500 px-6 py-2 rounded-md text-white hover:bg-yellow-600 w-full text-center"
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default UserProfileAvatarEdit;
