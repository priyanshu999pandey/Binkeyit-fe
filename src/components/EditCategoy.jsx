// src/components/EditCategory.jsx
import React, { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import Axios from "../utils/Axios";
import toast from "react-hot-toast";

const EditCategory = (props) => {
  // props.cardData: { id, name, image } — ensure you set `id` when opening modal
  const [data, setData] = useState({
    name: props?.cardData?.name || "",
    image: null, // File if user selects new file
  });

  const [preview, setPreview] = useState(props?.cardData?.image || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // useEffect(() => {
  //   // update local state if props change (when you open with a different card)
  //   setData({ name: props?.cardData?.name || "", image: null });
  //   setPreview(props?.cardData?.image || null);
  //   setError("");
  // }, [props?.cardData]);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImgChange = (e) => {
    setError("");
    const file = e.target.files?.[0];
    if (!file) return;

    setData((prev) => ({ ...prev, image: file }));

    // create preview
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!data.name?.trim()) {
      setError("Name is required.");
      return;
    }

    const formData = new FormData();
    formData.append("categoryId", props?.cardData?.id); // required
    formData.append("name", data.name.trim());

    // if user selected a new image -> send file
    if (data.image instanceof File) {
      formData.append("image", data.image);
    } else {
      // send old image url so backend knows to keep it
      formData.append("oldImage", props?.cardData?.image || "");
    }

    try {
      setLoading(true);
      const res = await Axios.put("/category/update-category", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success(res?.data?.message || "Category updated");

      // optionally you may call a parent fetch to refresh list
      setData({ name: "", image: null });
      setPreview(null);
      props.close(false);
    } catch (err) {
      console.error(err);
      const msg = err?.response?.data?.message || "Update failed. Try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="max-w-[70vw] w-full bg-white p-4 rounded shadow">
        <div className="flex justify-between items-center my-4">
          <h1 className="font-semibold"> Edit Category</h1>
          <button onClick={() => props.close(false)}>
            <IoCloseSharp size={30} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="categoryName">
               Name:
            </label>
            <input
              type="text"
              id="categoryName"
              name="name"
              placeholder="Enter category Name"
              value={data.name}
              onChange={handleChange}
              className="focus:outline-none border-blue-300 border w-full rounded bg-slate-100 py-2 px-2"
            />
          </div>

          <div className="mb-4">
            <p className="mb-2">Image</p>

            <div className="w-full lg:w-50 h-50 flex justify-center items-center border border-blue-300 mb-3">
              {preview ? (
                <img src={preview} alt="preview" className="max-h-40 object-contain" />
              ) : (
                <p className="text-sm text-gray-500">No image</p>
              )}
            </div>

            <div className="flex items-center gap-3">
              <label htmlFor="categoryImage">
                <div
                  className={`text-center lg:w-50 mt-1 px-4 py-1 rounded cursor-pointer ${
                    !data.name ? "bg-gray-500" : "bg-yellow-500"
                  }`}
                >
                  Upload Image
                </div>
              </label>
              <input
                type="file"
                id="categoryImage"
                className="hidden"
                accept="image/*"
                onChange={handleImgChange}
              />

              <button
                type="submit"
                disabled={!data.name || loading}
                className={`ml-2 px-4 py-1 rounded ${
                  !data.name || loading ? "bg-gray-300" : "bg-blue-500 text-white"
                }`}
              >
                {loading ? "Updating..." : "Save Change"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setData({ name: props?.cardData?.name || "", image: null });
                  setPreview(props?.cardData?.image || null);
                  setError("");
                }}
                className="ml-2 px-4 py-1 rounded bg-red-200"
              >
                Reset
              </button>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
        </form>
      </div>
    </section>
  );
};

export default EditCategory;
