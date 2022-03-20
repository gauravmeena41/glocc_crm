import React, { useState } from "react";
import { assignTask } from "../helper";
import Image from "next/image";
import { useRecoilValue } from "recoil";
import { employeesState } from "../atoms/employees";

const AssignTask = () => {
  const employees = useRecoilValue(employeesState);
  const [taskName, setTaskName] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [assignee, setAssignee] = useState("");
  const [assigneeName, setAssigneeName] = useState("");
  const [searchingEmployees, setSearchingEmployees] = useState({});

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
      <input
        onChange={(e) => setTaskName(e.target.value)}
        value={taskName}
        type="text"
        placeholder="task name"
        className="border-2 border-primary-text-light dark:border-secondary-text-dark bg-transparent  w-[100%] rounded-xl outline-none
          text-primary-text-light font-semibold  placeholder:text-secondary-text-light placeholder:dark:text-secondary-text-dark
           dark:text-primary-text-dark px-2 py-1"
      />
      <input
        onChange={(e) => setTaskDesc(e.target.value)}
        value={taskDesc}
        type="text"
        placeholder="task description"
        className="border-2 border-primary-text-light dark:border-secondary-text-dark bg-transparent  w-[100%] rounded-xl outline-none
          text-primary-text-light font-semibold  placeholder:text-secondary-text-light placeholder:dark:text-secondary-text-dark
           dark:text-primary-text-dark px-2 py-1"
      />
      <div>
        <input
          onChange={(e) => searchUser(e.target.value)}
          value={assigneeName}
          type="text"
          placeholder="search user..."
          className="border-2 border-primary-text-light dark:border-secondary-text-dark bg-transparent w-[100%] rounded-xl outline-none
            text-primary-text-light font-semibold placeholder:text-secondary-text-light placeholder:dark:text-secondary-text-dark dark:text-primary-text-dark px-2 py-1"
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
                  <h1 className="text-base-text-light dark:text-primary-text-dark font-medium">
                    {value.name}
                  </h1>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <button
        onClick={async () => {
          await assignTask(
            assignee.userAddress,
            assignee.orgId,
            taskName,
            taskDesc
          );
          setTaskName("");
          setTaskDesc("");
          setAssignee("");
          setAssigneeName("");
          setSearchingEmployees({});
        }}
        className="bg-bg-btn p-1 rounded-xl w-full text-lg text-secondary-text-light  dark:text-base-text-dark font-medium"
      >
        Assign Task
      </button>
    </div>
  );
};

export default AssignTask;
