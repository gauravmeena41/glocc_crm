import { checkIn, checkOut } from "../helper";
import { CheckCircleIcon } from "@heroicons/react/outline";

const MarkAttendanceCard = ({ currentUser }) => {
  return (
    <div
      className="shadow-base lg:hover:shadow-medium dark:shadow-none lg:dark:hover:shadow-none px-5 py-5 space-y-8 font-semibold w-full rounded-xl
    dark:bg-card transition-all duration-300 lg:hover:scale-[1.03]"
    >
      <h1 className="font-bold text-base-text-light dark:text-primary-text-dark flex items-center">
        Attendance
        <CheckCircleIcon className="w-[16px] h-[16px] text-primary-text-light font-medium dark:text-primary-text-dark ml-1" />
      </h1>
      <div className="flex justify-around">
        <button
          onClick={() => checkIn()}
          className="bg-bg-btn w-[130px] py-1 text-base-text-light dark:text-base-text-dark  text-lg font-semibold rounded-xl active:scale-[1.1]
        transition-all duration-200"
        >
          Check In
        </button>
        <button
          onClick={() => checkOut()}
          className="bg-bg-danger w-[130px] py-1 text-base-text-light dark:text-base-text-dark   text-lg font-semibold rounded-xl active:scale-[1.1]
        transition-all duration-200"
        >
          Check Out
        </button>
      </div>
    </div>
  );
};

export default MarkAttendanceCard;
