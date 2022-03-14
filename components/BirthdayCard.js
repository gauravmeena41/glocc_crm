import React, { useState } from "react";

const BirthdayCard = () => {
  const [birthdays, setBirthdays] = useState([]);
  return (
    <div
      className="shadow-base hover:shadow-medium dark:shadow-none dark:hover:shadow-none 
    rounded-xl transition-all duration-300 dark:bg-card min-h-[250px] pb-10 lg:hover:scale-[1.03]"
    >
      <div className="h-[10%]"></div>
      <div className="overflow-x-scroll overflow-y-scroll h-[90%] scrollbar-hide space-y-1 p-5">
        {birthdays.length > 0 ? (
          birthdays.map((name, idx) => (
            <h1
              key={idx}
              className="font-light text-lg text-gray-600 dark:text-secondary-text"
            >
              {name}
            </h1>
          ))
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <img
              src="images/birthday.svg"
              alt=""
              className="w-[60%] h-auto dark:opacity-[0.85]"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default BirthdayCard;
