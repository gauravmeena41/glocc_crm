import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { searchTask } from "../helper";

const TasksCard = () => {
  const user = useSelector((state) => state.user);
  const [tasks, setTasks] = useState({});

  const userTasks = () => {
    user?.tasks?.map(async (task) => {
      let data = await searchTask(task);
      data.taskStatus === "pending" &&
        setTasks((prevState) => {
          return { ...prevState, [task]: data };
        });
    });
  };

  useEffect(() => {
    userTasks();
  }, [user]);

  return (
    <div
      className="shadow-base hover:shadow-medium dark:shadow-none dark:hover:shadow-none 
   rounded-xl  transition-all duration-300  dark:bg-card min-h-[250px] pb-10 lg:hover:scale-[1.03]"
    >
      <div className="overflow-x-scroll overflow-y-scroll h-full w-full scrollbar-hide space-y-1 p-5">
        {Object.entries(tasks).length > 0 ? (
          Object.entries(tasks)?.map(([key, task]) => (
            <li className="font-light text-xl text-secondary-text-light dark:text-primary-text-dark">
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
