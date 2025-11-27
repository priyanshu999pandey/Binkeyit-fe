import React, { useState, useEffect } from "react";
import { FaCloudUploadAlt, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";
import Axios from "../utils/Axios";
import { setsubCategory } from "../store/productSlics";
import AddFieldsComponent from "../components/AddFieldsComponent";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const UploadProduct = () => {
  const dispatch = useDispatch();
  const allCategory = useSelector((state) => state.product.allCategory);

  const fetchData = async () => {
    try {
      const res = await Axios.get("/subCategory/fetch-subCategory");
      console.log("aagaya data", res?.data?.data);
      dispatch(setsubCategory(res?.data?.data));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const allSubCategory = useSelector((state) => state.product.subCategory);
  console.log("product allcategory", allCategory);
  console.log("product subcategory", allSubCategory);
  const [selectCategory, setSelectCategory] = useState("");
  const [selectSubCategory, setSelectSubCategory] = useState("");

  const [openAddField, setOpenAddField] = useState(false);
  const [fieldName, setFieldName] = useState("");

  const initialData = {
    name: "",
    image: [], // store File objects
    category: [],
    subCategory: [],
    unit: "",
    stock: "",
    price: "",
    discount: "",
    description: "",
    more_detail: {},
  };

  const [data, setData] = useState(initialData);

  // preview array: {id, url, name, size, file}
  const [previewUrls, setPreviewUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      setLoading(true);

      const AllCategoryIdArr = data.category.map((item) => item._id);
      const AllSubCategoryIdArr = data.subCategory.map((item) => item._id);

      const formData = new FormData();
      formData.append("name", data.name);
      // stringify arrays/objects before appending to FormData
      formData.append("category", JSON.stringify(AllCategoryIdArr));
      formData.append("subCategory", JSON.stringify(AllSubCategoryIdArr));
      formData.append("unit", data.unit);
      formData.append("stock", String(data.stock));
      formData.append("price", String(data.price));
      formData.append("discount", String(data.discount));
      formData.append("description", data.description || "");
      formData.append("more_detail", JSON.stringify(data.more_detail || {}));
      data.image.forEach((file) => {
        formData.append("image", file); // SAME KEY multiple times
      });

      console.log("form data", formData);

      const res = await Axios.post("/product/add-product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("actual data", res);

      // success toast
      // toast.success("Product uploaded successfully");
      Swal.fire({
        title: "Success!",
        text: "Product uploaded successfully",
        icon: "success",
        confirmButtonText: "OK",
      });

      // revoke object URLs to free memory
      previewUrls.forEach((p) => {
        try {
          URL.revokeObjectURL(p.url);
        } catch (err) {}
      });

      // reset states to initial
      setData(initialData);
      setPreviewUrls([]);
      setSelectCategory("");
      setSelectSubCategory("");

      // clear native file input so same files can be selected again
      const fileInput = document.getElementById("image");
      if (fileInput) fileInput.value = null;
    } catch (error) {
      console.log(error);
      toast.error("Failed to upload");
      setError(
        (error?.response &&
          error.response.data &&
          error.response.data.message) ||
          error.message ||
          "Failed to upload"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAddFields = () => {
    if (!fieldName) return;
    setData((prev) => {
      return {
        ...prev,
        more_detail: {
          ...prev.more_detail,
          [fieldName]: "",
        },
      };
    });
    setFieldName("");
    setOpenAddField(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImgChange = (e) => {
    setError("");
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // add files to data.image
    setData((prev) => ({
      ...prev,
      image: [...(prev.image || []), ...files],
    }));

    // create object URLs for preview
    const newPreviews = files.map((file) => ({
      id: `${file.name}_${file.size}_${file.lastModified}_${Date.now()}`,
      url: URL.createObjectURL(file),
      name: file.name,
      size: file.size,
      file,
    }));

    setPreviewUrls((prev) => [...prev, ...newPreviews]);

    // clear input (keeps files in state, but clears native input)
    e.target.value = null;
  };

  const removePreview = (id) => {
    const toRemove = previewUrls.find((p) => p.id === id);
    if (!toRemove) return;

    try {
      URL.revokeObjectURL(toRemove.url);
    } catch (err) {}
    setPreviewUrls((prev) => prev.filter((p) => p.id !== id));

    // remove corresponding File from data.image (by reference)
    setData((prev) => {
      let removed = false;
      const filtered = (prev.image || []).filter((f) => {
        if (!removed && f === toRemove.file) {
          removed = true;
          return false;
        }
        return true;
      });
      return { ...prev, image: filtered };
    });
  };

  useEffect(() => {
    return () => {
      previewUrls.forEach((p) => {
        try {
          URL.revokeObjectURL(p.url);
        } catch (err) {}
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section>
      <div className="shadow-md p-4 flex justify-between items-center">
        <h1 className="text-lg font-medium">Upload product</h1>
      </div>

      <form className="grid gap-5 p-4" onSubmit={handleSubmit}>
        <div className="grid gap-1">
          <label htmlFor="name" className="text-sm font-medium">
            Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Enter product name"
            name="name"
            value={data.name}
            onChange={handleChange}
            required
            className="focus-within:outline-none border border-yellow-500 py-1 px-2 rounded bg-blue-50"
          />
        </div>

        <div className="grid gap-1">
          <label htmlFor="desc" className="text-sm font-medium">
            Description
          </label>
          <textarea
            id="desc"
            placeholder="Enter product description"
            name="description"
            value={data.description}
            onChange={handleChange}
            required
            rows={3}
            className="focus-within:outline-none border border-yellow-500 py-1 px-2 rounded resize-none bg-blue-50"
          />
        </div>

        <div>
          <p className="mb-2 text-sm font-medium">Images</p>

          <div className="w-full h-24 border rounded-sm border-yellow-500 overflow-hidden mb-3">
            <label htmlFor="image" className="cursor-pointer block h-full">
              <div className="flex justify-center bg-blue-50 items-center h-full">
                <div className="flex flex-col justify-center items-center">
                  <FaCloudUploadAlt size={35} />
                  <p className="text-gray-500">Upload image(s)</p>
                  <p className="text-sm text-gray-400">
                    You can select multiple images
                  </p>
                </div>
              </div>
              <input
                type="file"
                accept="image/*"
                id="image"
                className="hidden"
                onChange={handleImgChange}
                multiple
              />
            </label>
          </div>

          {previewUrls.length > 0 ? (
            <div className="w-full">
              <div className="flex flex-wrap gap-3">
                {previewUrls.map((p) => (
                  <div
                    key={p.id}
                    className="relative rounded overflow-hidden w-28 h-20 sm:w-28 sm:h-20 xs:w-20 xs:h-16 border bg-white"
                  >
                    <img
                      src={p.url}
                      alt={p.name}
                      className="object-cover w-full h-full"
                      draggable={false}
                      loading="lazy"
                    />
                    <button
                      type="button"
                      onClick={() => removePreview(p.id)}
                      className="absolute top-1 right-1 bg-black bg-opacity-60 text-white rounded-full p-1"
                      title="Remove"
                    >
                      <FaTimes size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="w-full h-36 flex flex-col md:flex-row justify-center items-center gap-4 border border-dashed border-blue-200 rounded p-4 text-center">
              <div className="text-blue-400">
                <FaCloudUploadAlt size={40} />
              </div>
              <div>
                <p className="font-medium">No images selected</p>
                <p className="text-sm text-gray-500">
                  Click the upload area to add images. You can add multiple
                  images and remove them individually.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="grid gap-1">
          <label className="text-sm font-medium">Category</label>
          <select
            className="focus-within::outline-none border border-yellow-500 rounded px-2 py-2 bg-blue-50"
            value={selectCategory}
            onChange={(e) => {
              const value = e.target.value;
              console.log(value);

              const category = allCategory.find((el) => el._id == value);

              setData((prev) => {
                return {
                  ...prev,
                  category: [...prev.category, category],
                };
              });

              console.log(data);
            }}
          >
            <option value={""}>Select Category</option>
            {allCategory.map((cat, index) => {
              return (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              );
            })}
          </select>

          <div className="flex flex-wrap gap-5">
            {data?.category?.map((c, index) => {
              return (
                <div
                  key={index}
                  className="  flex  justify-center items-center gap-2 rounded bg-blue-100 py-2 px-4 "
                >
                  <p className="text-sm">{c.name}</p>
                  <div
                    className="hover:text-yellow-500"
                    onClick={() => {
                      const categoryLeft = data.category.filter(
                        (el) => el._id !== c._id
                      );
                      console.log(categoryLeft);

                      setData((prev) => {
                        return {
                          ...prev,
                          category: [...categoryLeft],
                        };
                      });
                    }}
                  >
                    <IoClose size={20} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid gap-1">
          <label className="text-sm font-medium">Sub Category</label>
          <select
            className="focus-within::outline-none border border-yellow-500 rounded px-2 py-2 bg-blue-50"
            value={selectSubCategory}
            onChange={(e) => {
              const value = e.target.value;
              console.log(value);

              const subcategory = allSubCategory.find((el) => el._id == value);

              setData((prev) => {
                return {
                  ...prev,
                  subCategory: [...prev.subCategory, subcategory],
                };
              });

              console.log(data);
            }}
          >
            <option value={""}>Select Sub Category</option>
            {allSubCategory.map((cat, index) => {
              return (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              );
            })}
          </select>

          <div className="flex flex-wrap gap-5">
            {data?.subCategory?.map((c, index) => {
              return (
                <div
                  key={index}
                  className="  flex  justify-center items-center gap-2 rounded bg-blue-100 py-2 px-4 "
                >
                  <p className="text-sm">{c.name}</p>
                  <div
                    className="hover:text-yellow-500"
                    onClick={() => {
                      const subcategoryLeft = data.subCategory.filter(
                        (el) => el._id !== c._id
                      );

                      setData((prev) => {
                        return {
                          ...prev,
                          subCategory: [...subcategoryLeft],
                        };
                      });
                    }}
                  >
                    <IoClose size={20} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid gap-1">
          <label htmlFor="unit" className="text-sm font-medium">
            Unit
          </label>
          <input
            type="text"
            id="unit"
            placeholder="Enter product unit"
            name="unit"
            value={data.unit}
            onChange={handleChange}
            required
            className="focus-within:outline-none border border-yellow-500 py-1 px-2 rounded bg-blue-50"
          />
        </div>

        <div className="grid gap-1">
          <label htmlFor="stock" className="text-sm font-medium">
            Number of stock
          </label>
          <input
            type="number"
            id="stock"
            placeholder="Enter product name"
            name="stock"
            value={data.stock}
            onChange={handleChange}
            required
            className="focus-within:outline-none border border-yellow-500 py-1 px-2 rounded bg-blue-50"
          />
        </div>

        <div className="grid gap-1">
          <label htmlFor="price" className="text-sm font-medium">
            Price
          </label>
          <input
            type="number"
            id="number"
            placeholder="Enter product price"
            name="price"
            value={data.price}
            onChange={handleChange}
            required
            className="focus-within:outline-none border border-yellow-500 py-1 px-2 rounded bg-blue-50"
          />
        </div>

        <div className="grid gap-1">
          <label htmlFor="Discount" className="text-sm font-medium">
            Discount
          </label>
          <input
            type="number"
            id="Discount"
            placeholder="Enter product discount"
            name="discount"
            value={data.discount}
            onChange={handleChange}
            required
            className="focus-within:outline-none border border-yellow-500 py-1 px-2 rounded bg-blue-50"
          />
        </div>

        {/* add more field */}
        <div>
          {Object.keys(data?.more_detail)?.map((k, index) => {
            return (
              <div className="grid gap-1" key={k}>
                <label htmlFor={k} className="text-sm font-medium">
                  {k}
                </label>
                <input
                  type="text"
                  id={k}
                  value={data?.more_detail[k]}
                  onChange={(e) => {
                    const value = e.target.value;

                    setData((prev) => {
                      return {
                        ...prev,
                        more_detail: {
                          ...prev.more_detail,
                          [k]: value,
                        },
                      };
                    });
                  }}
                  required
                  className="focus-within:outline-none border border-yellow-500 py-1 px-2 rounded bg-blue-50"
                />
              </div>
            );
          })}
        </div>

        <div
          className="bg-yellow-100 border border-yellow-500 rounded hover:bg-yellow-500 px-3 py-1 "
          onClick={() => setOpenAddField(true)}
        >
          Add fields
        </div>

        <button disabled={loading}>{loading ? "Creating..." : "submit"}</button>
      </form>
      
      {openAddField && (
        <AddFieldsComponent
          value={fieldName}
          onChange={(e) => setFieldName(e.target.value)}
          submit={handleAddFields}
          close={setOpenAddField}
        />
      )}
    </section>
  );
};

export default UploadProduct;
