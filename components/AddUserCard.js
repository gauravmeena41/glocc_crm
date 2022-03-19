import React, { useState } from "react";
import { addUser } from "../helper";

const AddUserCard = ({ orgData, roles }) => {
  const [orgUser, setOrgUser] = useState({
    userAddress: "",
    userName: "",
    userEmail: "",
    userRole: "",
    userTeam: "",
  });

  const resetForm = () => {
    setOrgUser({
      userAddress: "",
      userName: "",
      userEmail: "",
      userRole: "",
      userTeam: "",
    });
  };

  console.log(orgData);

  return (
    <div className="shadow-base lg:hover:shadow-medium dark:shadow-none lg:dark:hover:shadow-none dark:bg-card rounded-xl">
      <div className="flex flex-col m-5 py-2 space-y-3 overflow-scroll h-[350px]">
        <input
          onChange={(e) =>
            setOrgUser({ ...orgUser, userAddress: e.target.value })
          }
          value={orgUser.userAddress}
          type="text"
          placeholder="user eth address"
          className="border-2 border-primary-text-light dark:border-secondary-text-dark bg-transparent  w-[100%] rounded-xl outline-none
          text-primary-text-light font-semibold  placeholder:text-secondary-text-light placeholder:dark:text-secondary-text-dark
           dark:text-primary-text-dark px-2 py-1"
        />
        <input
          onChange={(e) => setOrgUser({ ...orgUser, userName: e.target.value })}
          value={orgUser.userName}
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
          value={orgUser.userEmail}
          type="text"
          placeholder="user email"
          className="border-2 border-primary-text-light dark:border-secondary-text-dark bg-transparent  w-[100%] rounded-xl outline-none
          text-primary-text-light font-semibold  placeholder:text-secondary-text-light placeholder:dark:text-secondary-text-dark
           dark:text-primary-text-dark px-2 py-1"
        />
        <select
          className="outline-none dark:bg-[#333333] rounded-lg dark:text-primary-text-dark p-1"
          onChange={(e) => setOrgUser({ ...orgUser, userRole: e.target.value })}
          defaultValue=""
        >
          <option disabled value="">
            Select Role
          </option>
          {roles?.map((role, idx) => (
            <option key={idx} value={role}>
              {role}
            </option>
          ))}
        </select>
        <select
          className="outline-none dark:bg-[#333333] rounded-lg dark:text-primary-text-dark p-1"
          onChange={(e) => setOrgUser({ ...orgUser, userTeam: e.target.value })}
          defaultValue=""
        >
          <option disabled value="">
            Select Department
          </option>
          {orgData?.departments?.map((department, idx) => (
            <option key={idx} value={department}>
              {department}
            </option>
          ))}
        </select>
        <button
          onClick={async () => {
            orgUser.userAddress &&
              orgUser.userName &&
              orgUser.userEmail &&
              orgUser.userRole &&
              orgUser.userTeam &&
              (await addUser(orgUser));
            resetForm();
          }}
          className="bg-bg-btn p-1 rounded-xl w-full text-lg text-primary-text-light dark:text-base-text-dark font-medium"
        >
          Create User
        </button>
      </div>
    </div>
  );
};

export default AddUserCard;
