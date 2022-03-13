import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { checkIn, checkOut } from "../helper";

const MarkAttendanceCard = ({ currentUser }) => {
  const user = useSelector((state) => state.user);
  return (
    <div className="!dark:shadow-base lg:!dark:hover:shadow-medium lg:px-5 py-5 space-y-8 font-semibold w-full rounded-xl dark:bg-card  transition-all duration-300">
      <h1 className="font-bold text-base-text-light dark:text-primary-text-dark">
        Attendance
      </h1>
      <div className="flex justify-around">
        <button
          onClick={() => checkIn()}
          className="bg-bg-btn w-[130px] py-1 text-base-text-light dark:text-base-text-dark  text-lg font-semibold rounded-full active:scale-[1.1]
        transition-all duration-200"
        >
          Check In
        </button>
        <button
          onClick={() => checkOut()}
          className="bg-bg-danger w-[130px] py-1 text-base-text-light dark:text-base-text-dark   text-lg font-semibold rounded-full active:scale-[1.1]
        transition-all duration-200"
        >
          Check Out
        </button>
      </div>
    </div>
  );
};

export default MarkAttendanceCard;
