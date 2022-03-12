import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const TasksCard = () => {
  const user = useSelector((state) => state.user);
  const [tasks, setTasks] = useState({});

  useEffect(() => {
    user?.tasks?.map(
      (task, idx) =>
        task.taskStatus === "pending" &&
        setTasks((prevState) => {
          return { ...prevState, [task.taskId]: task };
        })
    );
  }, []);

  return (
    <div
      className="col-span-1 row-span-1  shadow-shadow-base 
  m-4 lg:m-8 hover:scale-[1.02]  rounded-md  transition-all duration-300  h-[250px] lg:h-[350px] dark:bg-card"
    >
      <div className="overflow-x-scroll overflow-y-scroll h-full w-full scrollbar-hide space-y-1 p-5">
        {Object.entries(tasks).length > 0 ? (
          Object.entries(tasks)?.map(([key, task]) => (
            <li className="font-light text-lg text-gray-600 dark:text-secondary-text">
              {task.taskName}
            </li>
          ))
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <img
              src="images/task.svg"
              className="w-[60%] h-auto dark:opacity-[0.85]"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TasksCard;
