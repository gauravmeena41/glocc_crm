import React, { useState } from "react";
import { addDepartment } from "../helper";

const AddDepartmentCard = () => {
  const [department, setDepartment] = useState("");

  return (
    <div className="shadow-equal-shadow dark:bg-card">
      <h1 className="border-b border-gray-400 p-2 text-center text-lg font-medium text-gray-700 dark:text-primary-text rounded-sm">
        Add Department
      </h1>
      <div className="flex flex-col m-5 py-2 space-y-3 overflow-scroll h-[350px]">
        <input
          onChange={(e) => setDepartment(e.target.value)}
          type="text"
          placeholder="department name..."
          className="border-2 bg-transparent px-2 py-1 text-gray-500
            dark:text-secondary-text rounded-full outline-none"
        />
        <button
          onClick={() => addDepartment(department)}
          className="bg-green-400 p-1 rounded-sm w-full text-lg text-white font-medium"
        >
          Create Department
        </button>
      </div>
    </div>
  );
};

export default AddDepartmentCard;
