import React from "react";
import { IoClose } from "react-icons/io5";

const AddFieldsComponent = ({ close, value, onChange, submit }) => {
  return (
    <section className="fixed inset-0 bg-black/80 z-50 flex justify-center items-center">
      <div className="bg-white max-w-md w-full p-4 ">
        <div className="flex justify-between">
          <h1>Add Feild</h1>
          <button onClick={()=>close(false)}>
            <IoClose size={25} />
          </button>
        </div>
        <input
          className="w-full focus-within: outline-none border border-yellow-500 py-1"
          placeholder="Enter feild name"
          value={value}
          onChange={onChange}
        />
        <button onClick={submit} 
          className="bg-yellow-200 hover:bg-yellow-500">
          Add Field
        </button>
      </div>

      
    </section>
  );
};

export default AddFieldsComponent;
