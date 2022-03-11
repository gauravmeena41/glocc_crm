import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import WeatherCard from "./WeatherCard";

const Mainbar = () => {
  const user = useSelector((state) => state.user);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 w-full">
      <WeatherCard />
      <div
        className="col-span-1 row-span-1  shadow-shadow-base 
      m-8 hover:scale-[1.02]  rounded-md  transition-all duration-300 h-[350px] dark:bg-card"
      >
        <div className="h-[10%]">
          <h1
            className="font-medium text-center text-xl dark:text-[#e4e6eb] shadow p-1 
          dark:bg-[#333333]"
          >
            Tasks
          </h1>
        </div>
        <div className="overflow-x-scroll overflow-y-scroll h-[90%] scrollbar-hide space-y-1 p-5">
          {user?.tasks?.map((task, idx) => (
            <h1 className="font-light text-lg text-gray-600 dark:text-secondary-text">
              <span className="text-gray-900 font-semibold dark:text-primary-text">
                1.
              </span>{" "}
              {task.taskName}
            </h1>
          ))}
        </div>
      </div>
      <div
        className="col-span-1 row-span-1  shadow-shadow-base hover:shadow-shadow-medium 
      m-8 hover:scale-[1.02]  rounded-md  transition-all duration-300 h-[350px] dark:bg-card"
      >
        <div className="h-[10%]">
          <h1
            className="font-medium text-center text-xl dark:text-[#e4e6eb] shadow p-1 
          dark:bg-[#333333]"
          >
            Birthday
          </h1>
        </div>
        <div className="overflow-x-scroll overflow-y-scroll h-[90%] scrollbar-hide space-y-1 p-5">
          <h1 className="font-light text-lg text-gray-600 dark:text-secondary-text">
            Akash Sharma
          </h1>
          <h1 className="font-light text-lg text-gray-600 dark:text-secondary-text">
            Shubham Sharma
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Mainbar;
