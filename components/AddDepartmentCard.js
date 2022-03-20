import React, { useState } from "react";
import { addDepartment } from "../helper";

const AddDepartmentCard = () => {
  const [department, setDepartment] = useState("");

  return (
    <div className="flex flex-col m-5 py-2 space-y-3 overflow-scroll h-[350px]">
      <input
        onChange={(e) => setDepartment(e.target.value)}
        value={department}
        type="text"
        placeholder="department name..."
        className="border-2 border-primary-text-light dark:border-secondary-text-dark bg-transparent  w-[100%] rounded-xl outline-none
          text-primary-text-light font-semibold  placeholder:text-secondary-text-light placeholder:dark:text-secondary-text-dark
           dark:text-primary-text-dark px-2 py-1"
      />
      <button
        onClick={async () => {
          await addDepartment(department);
          setDepartment("");
        }}
        className="bg-bg-btn p-1 rounded-xl w-full text-lg text-primary-text-light dark:text-base-text-dark font-medium"
      >
        Create Department
      </button>
    </div>
  );
};

export default AddDepartmentCard;
