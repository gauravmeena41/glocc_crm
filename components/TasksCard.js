import Image from "next/image";
import { useEffect, useState } from "react";

import { useRecoilValue } from "recoil";
import { userState } from "../atoms/user";
import { searchTask } from "../helper";

const TasksCard = () => {
  const user = useRecoilValue(userState);
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
      className="shadow-base dark:shadow-none bg-[#fff] dark:bg-card rounded-[2rem]
      transition-all duration-300 ease-in-out min-h-[250px] w-full pb-10 sm:pb-0"
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
            <div className="relative w-[180px] h-[180px] dark:opacity-[0.85]">
              <Image
                src="/images/task.svg"
                layout="fill"
                className="object-cover"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TasksCard;
