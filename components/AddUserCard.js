import React, { useState } from "react";
import { addUser } from "../helper";

const AddUserCard = ({ orgData }) => {
  const [orgUser, setOrgUser] = useState({
    userAddress: "",
    userName: "",
    userEmail: "",
    userRole: "",
    userTeam: "",
  });

  return (
    <div className="shadow-base lg:hover:shadow-medium dark:shadow-none lg:dark:hover:shadow-none dark:bg-card rounded-xl">
      <h1 className="border-b-2 border-secondary-text-light dark:border-secondary-text-dark p-2 text-center text-lg font-medium text-base-text-light dark:text-primary-text-dark">
        Add User
      </h1>
      <div className="flex flex-col m-5 py-2 space-y-3 overflow-scroll h-[350px]">
        <input
          onChange={(e) =>
            setOrgUser({ ...orgUser, userAddress: e.target.value })
          }
          type="text"
          placeholder="user address"
          className="border-2 border-primary-text-light dark:border-secondary-text-dark bg-transparent  w-[100%] rounded-xl outline-none
          text-primary-text-light font-semibold  placeholder:text-secondary-text-light placeholder:dark:text-secondary-text-dark
           dark:text-primary-text-dark px-2 py-1"
        />
        <input
          onChange={(e) => setOrgUser({ ...orgUser, userName: e.target.value })}
          type="text"
          placeholder="user name"
          className="border-2 border-primary-text-light dark:border-secondary-text-dark bg-transparent  w-[100%] rounded-xl outline-none
          text-primary-text-light font-semibold  placeholder:text-secondary-text-light placeholder:dark:text-secondary-text-dark
           dark:text-primary-text-dark px-2 py-1"
        />
        <input
          onChange={(e) =>
            setOrgUser({ ...orgUser, userEmail: e.target.value })
          }
          type="text"
          placeholder="user email"
          className="border-2 border-primary-text-light dark:border-secondary-text-dark bg-transparent  w-[100%] rounded-xl outline-none
          text-primary-text-light font-semibold  placeholder:text-secondary-text-light placeholder:dark:text-secondary-text-dark
           dark:text-primary-text-dark px-2 py-1"
        />
        <select
          className="outline-none dark:bg-[#333333] rounded-lg dark:text-primary-text-dark p-1"
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
          className="outline-none dark:bg-[#333333] rounded-lg dark:text-primary-text-dark p-1"
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
          className="bg-bg-btn p-1 rounded-xl w-full text-lg text-primary-text-light dark:text-base-text-dark font-medium"
        >
          Create User
        </button>
      </div>
    </div>
  );
};

export default AddUserCard;
