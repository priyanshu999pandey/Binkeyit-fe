// import React from "react";

// import {
//   createColumnHelper,
//   flexRender,
//   getCoreRowModel,
//   useReactTable,
// } from "@tanstack/react-table";

// import { useSelector } from "react-redux";

// const DisplayTable = ({ columns,data }) => {

//   // const subCategoryData = useSelector((state) => state.product.subCategory);

//   const table = useReactTable({
//     data:data,
//     columns,
//     getCoreRowModel: getCoreRowModel(),

//   });
//    console.log("dis[lay data",data)

//   return (
//     <div>
//       <div className="p-2">
//         <table className="w-full">
//           <thead className="bg-black text-white ">
//             {table.getHeaderGroups().map((headerGroup) => (
//               <tr key={headerGroup.id}>
//                 {
//                     <th>Sr.No</th>
//                 }
//                 {headerGroup.headers.map((header) => (
//                   <th key={header.id} className="border">
//                     {header.isPlaceholder
//                       ? null
//                       : flexRender(
//                           header.column.columnDef.header,
//                           header.getContext()
//                         )}
//                   </th>
//                 ))}
//               </tr>
//             ))}
//           </thead>
//           <tbody>
//             {table.getRowModel().rows.map((row,index) => (
//               <tr key={row.id}>
//                 <td className="border pt-2 px-2">{index+1}</td>
//                 {row.getVisibleCells().map((cell) => (
//                   <td key={cell.id} className="border pt-2 px-2 ">
//                     {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>

//         </table>
//         <div className="h-4" />

//       </div>
//     </div>
//   );
// };

// export default DisplayTable;

import React, { useState } from "react";
import { FaPencil } from "react-icons/fa6";
import { RiDeleteBin6Fill } from "react-icons/ri";
import EditSubCategory from "./EditSubCategory";
import Axios from "../utils/Axios";
import { removeSubCategory } from "../store/productSlics";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

const DisplayTable = ({ data, index }) => {
  const dispatch = useDispatch();
  console.log("table data", data);
  const [editsubCategory, setEditSubCategory] = useState(false);

  const handleOnClickDelete = async (id) => {
    console.log("cliked");
    
    console.log(id)

    try {
      console.log("api");

      const res = await Axios.delete(
        `/subCategory/delete-subCategory/${id}`
      );
      dispatch(removeSubCategory(res?.data?.data));
      console.log("deleted data ", res?.data?.data);
      toast.success(res?.data?.message);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="flex justify-between border  ">
        <div className="w-[10%] border-r text-center  pt-3 flex  justify-center items-center  ">
          {index + 1}
        </div>
        <div className="w-[25%] border-r text-center pt-3 flex  justify-center items-center  ">
          {data.name}
        </div>
        <div className="w-[15%] border-r flex justify-center items-center pt-3 ">
          <img src={data.image} className="w-10" />
        </div>
        <div className="w-[25%] border-r text-center pt-3 flex  justify-center items-center  ">
          {data?.category[0]?.name}
        </div>
        <div className="w-[25%] border-r gap-5 pt-3 flex  justify-center items-center ">
          <button
            className="p-2 rounded-full bg-green-100 text-green-500 hover:text-black hover:bg-green-300"
            onClick={() => setEditSubCategory(true)}
          >
            <FaPencil size={20} />
          </button>
          <button
            className="p-2 rounded-full bg-red-100 text-red-500 hover:text-black hover:bg-red-300"
            onClick={() => handleOnClickDelete(data._id)}
          >
            <RiDeleteBin6Fill size={20} />
          </button>
        </div>
      </div>

      {editsubCategory && (
        <EditSubCategory close={setEditSubCategory} data={data} />
      )}
    </div>
  );
};

export default DisplayTable;
