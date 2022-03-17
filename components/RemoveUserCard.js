import React, { useEffect, useState } from "react";
import { assignTask, removeUser, searchTask, updateTask } from "../helper";
import Image from "next/image";
import { CheckCircleIcon } from "@heroicons/react/outline";

const RemoveUserCard = ({ employees }) => {
  const [assignee, setAssignee] = useState("");
  const [assigneeName, setAssigneeName] = useState("");
  const [searchingEmployees, setSearchingEmployees] = useState({});

  const searchUser = (user) => {
    employees[0].role === "Chief Technical Office" && employees.shift();
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
    <div className="shadow-base lg:hover:shadow-medium dark:shadow-none lg:dark:hover:shadow-none dark:bg-card rounded-xl">
      <div className="flex flex-col m-5 py-2 space-y-3 overflow-scroll h-[350px]">
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

        {assignee && (
          <button
            onClick={async () => {
              await removeUser(assignee.orgId, assignee.userAddress);
              setAssigneeName("");
              setAssignee({});
              setSearchingEmployees({});
            }}
            className="bg-bg-danger p-1 rounded-xl w-full text-lg text-secondary-text-light  dark:text-base-text-dark font-medium"
          >
            Remove User
          </button>
        )}
      </div>
    </div>
  );
};

export default RemoveUserCard;
