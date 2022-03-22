import { DateTime } from "luxon";
import { useState, useEffect } from "react";
import { fetchHolidays } from "../helper";

const HolidaysCard = () => {
  const [holidays, setHolidays] = useState([]);

  useEffect(() => {
    setHolidays(fetchHolidays(2022));
  }, []);

  console.log(holidays);

  return (
    <div
      className="shadow-medium dark:shadow-none bg-[#fff] dark:bg-card rounded-2xl
      transition-all duration-300 ease-in-out min-h-[250px] max-h-[320px] overflow-hidden w-full p-5"
    >
      <div className="h-full overflow-scroll">
        {holidays?.map((holiday, idx) => (
          <div className="grid grid-cols-5 border-b-2 dark:border-[#414141] mt-2">
            <div className="col-span-4">
              <h1 className="text-primary-text-light dark:text-primary-text-dark">
                {holiday.name}
              </h1>
              <h1 className="text-secondary-text-light dark:text-secondary-text-dark text-xs  mb-2">
                {DateTime.fromSQL(holiday.date).toFormat("DDD")}
              </h1>
            </div>
            <div className="col-span-1">
              <p className="text-primary-text-light dark:text-primary-text-dark">
                {DateTime.fromSQL(holiday.date).toFormat("cccc")}
              </p>
              <p className="text-secondary-text-light dark:text-secondary-text-dark text-xs mb-2">
                {holiday.type}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HolidaysCard;
