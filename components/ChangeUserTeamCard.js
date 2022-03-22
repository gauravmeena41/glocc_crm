import React, { useState } from "react";
import Image from "next/image";
import { changeUserteam } from "../helper";
import { useRecoilValue } from "recoil";
import { employeesState } from "../atoms/employees";
import { orgState } from "../atoms/org";

const ChangeUserTeamCard = () => {
  const employees = useRecoilValue(employeesState);
  const orgData = useRecoilValue(orgState);
  const [assignee, setAssignee] = useState("");
  const [assigneeName, setAssigneeName] = useState("");
  const [searchingEmployees, setSearchingEmployees] = useState({});
  const [newDepartment, setNewDepartment] = useState("");

  const searchUser = (user) => {
    setSearchingEmployees({});
    setAssigneeName(user);
    Object?.entries(employees)?.map(([key, value]) => {
      value?.name.includes(user) &&
        setSearchingEmployees((prevState) => {
          return { ...prevState, [key]: value };
        });
    });
    !user && setSearchingEmployees({});
  };

  return (
    <div className="flex flex-col m-5 py-2 space-y-3 overflow-scroll h-[350px]">
      <select
        onChange={(e) => setNewDepartment(e.target.value)}
        className="w-full outline-none border-none bg-transparent text-base-text-light dark:text-primary-text-dark p-1 font-medium
        text-lg rounded-xl cursor-pointer dark:bg-[#333333]"
      >
        {orgData?.departments?.map((department, idx) => (
          <option key={idx} className="dark:bg-[#333333]" value={department}>
            {department}
          </option>
        ))}
      </select>
      <div>
        <input
          onChange={(e) => searchUser(e.target.value)}
          value={assigneeName}
          type="text"
          placeholder="search user..."
          className="border-2 border-primary-text-light dark:border-secondary-text-dark bg-transparent w-[100%] rounded-xl outline-none
          text-primary-text-dark-light font-semibold  placeholder:text-secondary-text-light placeholder:dark:text-secondary-text-dark dark:text-primary-text-dark px-2 py-1"
        />
        {Object.entries(searchingEmployees).length > 0 && (
          <div className="space-y-2  rounded-xl p-2 animate-fade-in-out transition-all duration-300">
            {Object.entries(searchingEmployees).map(([key, value]) => (
              <div key={key}>
                <div
                  className="flex items-center space-x-2 px-2 py-1 cursor-pointer hover:scale-[1.02] transition-all duration-300"
                  onClick={() => {
                    setAssignee(value);
                    setAssigneeName(value?.name);
                    setSearchingEmployees({});
                  }}
                >
                  <div className="relative w-[32px] h-[32px] rounded-full bg-bg-danger">
                    <Image
                      src={value.avatar}
                      layout="fill"
                      className="rounded-full object-cover"
                    />
                  </div>
                  <h1 className="text-base-text-light dark:text-primary-text-dark">
                    {value.name}
                  </h1>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <button
        onClick={() =>
          newDepartment && changeUserteam(assignee.userAddress, newDepartment)
        }
        className="bg-bg-btn p-1 rounded-xl w-full text-lg text-primary-text-light dark:text-base-text-dark font-medium"
      >
        Change Team
      </button>
    </div>
  );
};

export default ChangeUserTeamCard;
