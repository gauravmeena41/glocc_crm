import { useRecoilState } from "recoil";
import { DateTime } from "luxon";
import { userState } from "../atoms/user";

const AttendanceCard = () => {
  const [user] = useRecoilState(userState);

  return (
    <div
      className="shadow-base hover:shadow-medium dark:shadow-none dark:hover:shadow-none
    rounded-xl transition-all duration-300 dark:bg-card lg:hover:scale-[1.02] max-h-[320px] overflow-hidden"
    >
      <div className="flex justify-around border-b border-base-text-light dark:border-secondary-text-dark">
        <h1 className="text-base-text-light dark:text-primary-text-dark text-lg font-semibold my-2">
          Check In
        </h1>
        <h1 className="text-base-text-light dark:text-primary-text-dark text-lg font-semibold my-2">
          Check Out
        </h1>
      </div>
      <div className=" mt-5 grid grid-cols-2 text-center">
        <div className="space-y-1 h-[80%] overflow-scroll">
          {user.checkIn?.map((data, idx) => (
            <h1
              key={idx}
              className="text-lg text-secondary-text-light dark:text-secondary-text-dark"
            >
              {DateTime.fromJSDate(new Date()).toFormat("d") ===
                DateTime.fromMillis(data.toNumber() * 1000).toFormat("d") &&
                DateTime.fromMillis(data.toNumber() * 1000).toFormat("tt")}
            </h1>
          ))}
        </div>
        <div className="space-y-1 h-[80%] overflow-scroll">
          {user.checkOut?.map((data, idx) => (
            <h1
              key={idx}
              className="text-lg text-secondary-text-light dark:text-secondary-text-dark"
            >
              {DateTime.fromJSDate(new Date()).toFormat("d") ===
                DateTime.fromMillis(data.toNumber() * 1000).toFormat("d") &&
                DateTime.fromMillis(data.toNumber() * 1000).toFormat("tt")}
            </h1>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AttendanceCard;
