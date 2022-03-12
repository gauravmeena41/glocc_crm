import React, { useEffect, useState } from "react";
import { assignTask, updateTask } from "../helper";
import Image from "next/image";
import { CheckCircleIcon } from "@heroicons/react/outline";

const UpdateTaskCard = ({ employees }) => {
  const [assignee, setAssignee] = useState("");
  const [assigneeName, setAssigneeName] = useState("");
  const [searchingEmployees, setSearchingEmployees] = useState({});
  const [updatedTask, setUpdateTask] = useState("");

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

  useEffect(() => {
    !assigneeName && setAssignee("");
  }, [assigneeName]);

  return (
    <div className="shadow-equal-shadow dark:bg-card">
      <h1 className="border-b border-gray-400 p-2 text-center text-lg font-medium text-gray-700 dark:text-primary-text rounded-sm">
        Update Task
      </h1>
      <div className="flex flex-col m-5 py-2 space-y-3 overflow-scroll h-[350px]">
        <div>
          <input
            onChange={(e) => searchUser(e.target.value)}
            value={assigneeName}
            type="text"
            placeholder="search user..."
            className="border-2 bg-transparent w-full my-2 px-2 py-1 text-gray-500
      dark:text-secondary-text rounded-full outline-none"
          />
          {Object.entries(searchingEmployees).length > 0 && (
            <div className="space-y-2 bg-[#333333] rounded-sm p-2">
              {Object.entries(searchingEmployees).map(([key, value]) => (
                <div key={key}>
                  <div
                    className="flex items-center space-x-2 dark:bg-[#333333] rounded-full px-2 py-1 cursor-pointer hover:scale-[1.02] transition-all duration-300"
                    onClick={() => {
                      setAssignee(value);
                      setAssigneeName(value?.name);
                      setSearchingEmployees({});
                    }}
                  >
                    <div className="relative w-[32px] h-[32px] rounded-full bg-yellow-500">
                      <Image
                        src={value.avatar}
                        layout="fill"
                        className="rounded-full object-cover"
                      />
                    </div>
                    <h1>{value.name}</h1>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {assignee && (
          <div className="space-y-2">
            {assignee.tasks?.map(
              (task, idx) =>
                task.taskStatus === "pending" && (
                  <div
                    key={task.taskId.toNumber()}
                    className="shadow-equal-shadow flex items-center justify-between bg-[#464545] rounded-full px-4 py-1"
                  >
                    <h1>{task.taskName}</h1>
                    <CheckCircleIcon
                      onClick={async () =>
                        await updateTask(
                          assignee.orgId,
                          assignee.userAddress,
                          task.taskId.toNumber()
                        )
                      }
                      className="w-[24px] h-[24px] transition-all duration-300 hover:text-green-500"
                    />
                  </div>
                )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateTaskCard;
