import React, { useEffect, useState } from "react";
import { searchTask, updateTask } from "../helper";
import Image from "next/image";
import { CheckCircleIcon } from "@heroicons/react/outline";
import { useRecoilValue } from "recoil";
import { employeesState } from "../atoms/employees";

const UpdateTaskCard = () => {
  const employees = useRecoilValue(employeesState);
  const [assignee, setAssignee] = useState("");
  const [assigneeName, setAssigneeName] = useState("");
  const [searchingEmployees, setSearchingEmployees] = useState({});
  const [userTasks, setUserTasks] = useState({});

  const searchUser = (user) => {
    setUserTasks({});
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

  useEffect(() => {
    !assigneeName && setAssignee("");
    assignee?.tasks?.map(async (task) => {
      let data = await searchTask(task);
      data.taskStatus === "pending" &&
        setUserTasks((prevState) => {
          return { ...prevState, [task]: data };
        });
    });
  }, [assignee]);

  return (
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
        <div className="space-y-2">
          {Object.entries(userTasks).length > 0
            ? Object.entries(userTasks)?.map(([idx, task]) => (
                <div
                  key={task.taskId.toNumber()}
                  className="flex items-center justify-between px-4 py-1"
                >
                  <h1 className="dark:text-primary-text-dark">
                    {task.taskName}
                  </h1>
                  <CheckCircleIcon
                    onClick={async () => {
                      await updateTask(task.taskId.toNumber());
                      setAssignee({});
                      setAssigneeName("");
                      setUserTasks({});
                      setSearchingEmployees({});
                    }}
                    className="w-[24px] h-[24px] transition-all duration-300 dark:text-primary-text-dark hover:text-green-500"
                  />
                </div>
              ))
            : assigneeName.length > 0 && (
                <h1 className="text-center text-xs text-secondary-text-light dark:text-primary-text-dark">
                  No task assigned
                </h1>
              )}
        </div>
      )}
    </div>
  );
};

export default UpdateTaskCard;
