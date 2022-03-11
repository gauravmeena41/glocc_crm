import React, { useState } from "react";

const AddUserCard = ({ orgData }) => {
  const [orgUser, setOrgUser] = useState({
    userAddress: "",
    userName: "",
    userEmail: "",
    userRole: "",
    userTeam: "",
  });

  return (
    <div className="shadow-equal-shadow dark:bg-card">
      <h1 className="border-b border-gray-400 p-2 text-center text-lg font-medium text-gray-700 dark:text-primary-text rounded-sm">
        Add User
      </h1>
      <div className="flex flex-col m-5 py-2 space-y-3 overflow-scroll h-[350px]">
        <input
          onChange={(e) =>
            setOrgUser({ ...orgUser, userAddress: e.target.value })
          }
          type="text"
          placeholder="user address"
          className="border-2 bg-transparent px-2 py-1 text-gray-500
            dark:text-secondary-text rounded-full outline-none"
        />
        <input
          onChange={(e) => setOrgUser({ ...orgUser, userName: e.target.value })}
          type="text"
          placeholder="user name"
          className="border-2 bg-transparent px-2 py-1 text-gray-500
            dark:text-secondary-text rounded-full outline-none"
        />
        <input
          onChange={(e) =>
            setOrgUser({ ...orgUser, userEmail: e.target.value })
          }
          type="text"
          placeholder="user email"
          className="border-2 bg-transparent px-2 py-1 text-gray-500
            dark:text-secondary-text rounded-full outline-none"
        />
        <select
          className="outline-none dark:bg-[#333333] rounded-lg dark:text-primary-text p-1"
          defaultValue=""
          onChange={(e) => setOrgUser({ ...orgUser, userRole: e.target.value })}
        >
          <option disabled value="">
            Select Role
          </option>
          <option value="HR Manager">HR Manager</option>
          <option value="Training Manager">Training Manager</option>
          <option value="Chief Technical Office">Chief Technical Office</option>
          <option value="Business Development Manager">
            Business Development Manager
          </option>
          <option value="Developer">Developer</option>
        </select>
        <select
          className="outline-none dark:bg-[#333333] rounded-lg dark:text-primary-text p-1"
          defaultValue=""
          onChange={(e) => setOrgUser({ ...orgUser, userTeam: e.target.value })}
        >
          <option disabled value="">
            Select Department
          </option>
          {orgData.departments?.map((department, idx) => (
            <option key={idx} value={department}>
              {department}
            </option>
          ))}
        </select>
        <button
          onClick={() =>
            orgUser.userAddress &&
            orgUser.userName &&
            orgUser.userEmail &&
            orgUser.userRole &&
            orgUser.userTeam &&
            addUser(orgUser)
          }
          className="bg-green-400 p-1 rounded-sm w-full text-lg text-white font-medium"
        >
          Create User
        </button>
      </div>
    </div>
  );
};

export default AddUserCard;
