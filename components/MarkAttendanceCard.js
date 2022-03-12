import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { checkIn, checkOut } from "../helper";

const MarkAttendanceCard = ({ currentUser }) => {
  const user = useSelector((state) => state.user);
  return (
    <div className="shadow-equal-shadow lg:px-5 py-5 space-y-8 font-semibold w-full rounded-sm dark:bg-card lg:hover:scale-[1.02] transition-all duration-300">
      <h1>Attendance</h1>
      <div className="flex justify-around">
        <button
          onClick={() => checkIn()}
          className="bg-[#52b788] w-[130px] py-1 text-white dark:text-card   text-lg font-medium rounded-full active:scale-[1.1]
        transition-all duration-200"
        >
          Check In
        </button>
        <button
          onClick={() => checkOut()}
          className="bg-[#ff0a54] w-[130px] py-1 text-white dark:text-card  text-lg font-medium rounded-full active:scale-[1.1]
        transition-all duration-200"
        >
          Check Out
        </button>
      </div>
    </div>
  );
};

export default MarkAttendanceCard;
