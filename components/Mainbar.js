import React from "react";

const Mainbar = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 w-full">
      <div
        className="col-span-1 row-span-1  shadow-shadow-base hover:shadow-shadow-medium 
      m-8 hover:m-5 rounded-md  transition-all duration-300 h-[350px] dark:bg-card"
      >
        <div className="h-[10%]">
          <h1 className="font-medium text-center text-xl dark:text-[#e4e6eb] shadow p-1">
            Tasks
          </h1>
        </div>
        <div className="overflow-x-scroll overflow-y-scroll h-[90%] scrollbar-hide space-y-1 p-5">
          <h1 className="font-light text-lg text-gray-600 dark:text-secondary-text">
            <span className="text-gray-900 font-semibold dark:text-primary-text">
              1.
            </span>{" "}
            Task karna hai ye
          </h1>
        </div>
      </div>
      <div
        className="col-span-1 row-span-1  shadow-shadow-base hover:shadow-shadow-medium 
      m-8 hover:m-5 rounded-md  transition-all duration-300 h-[350px] dark:bg-card"
      >
        <div className="h-[10%]">
          <h1 className="font-medium text-center text-xl dark:text-[#e4e6eb] shadow p-1">
            Birthday
          </h1>
        </div>
        <div className="overflow-x-scroll overflow-y-scroll h-[90%] scrollbar-hide space-y-1 p-5">
          <h1 className="font-light text-lg text-gray-600 dark:text-secondary-text">
            {/* <span className="text-gray-900 font-semibold dark:text-primary-text">
              1.
            </span> */}
            Akash Sharma
          </h1>
          <h1 className="font-light text-lg text-gray-600 dark:text-secondary-text">
            {/* <span className="text-gray-900 font-semibold dark:text-primary-text">
              1.
            </span> */}
            Shubham Sharma
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Mainbar;
