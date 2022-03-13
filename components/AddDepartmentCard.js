import React, { useState } from "react";
import { addDepartment } from "../helper";

const AddDepartmentCard = () => {
  const [department, setDepartment] = useState("");

  return (
    <div className="!dark:shadow-base dark:bg-card rounded-xl">
      <h1 className="border-b-2 border-secondary-text-light dark:border-secondary-text-dark p-2 text-center text-lg font-medium text-base-text-light dark:text-primary-text-dark">
        Add Department
      </h1>
      <div className="flex flex-col m-5 py-2 space-y-3 overflow-scroll h-[350px]">
        <input
          onChange={(e) => setDepartment(e.target.value)}
          type="text"
          placeholder="department name..."
          className="border-2 border-primary-text-light dark:border-secondary-text-dark bg-transparent  w-[100%] rounded-xl outline-none
          text-primary-text-light font-semibold  placeholder:text-secondary-text-light placeholder:dark:text-secondary-text-dark
           dark:text-primary-text-dark px-2 py-1"
        />
        <button
          onClick={() => addDepartment(department)}
          className="bg-bg-btn p-1 rounded-xl w-full text-lg text-primary-text-light dark:text-base-text-dark font-medium"
        >
          Create Department
        </button>
      </div>
    </div>
  );
};

export default AddDepartmentCard;
