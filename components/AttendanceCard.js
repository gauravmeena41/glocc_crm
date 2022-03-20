import { useRecoilState } from "recoil";
import { DateTime } from "luxon";
import { userState } from "../atoms/user";

const AttendanceCard = () => {
  const [user] = useRecoilState(userState);

  return (
    <div
      className="shadow-base dark:shadow-none bg-[#fff] dark:bg-card rounded-[2rem]
      transition-all duration-300 ease-in-out min-h-[250px] max-h-[320px] overflow-hidden w-full"
    >
      <div className="flex justify-around my-5">
        <h1 className="text-[#7e7e7e] dark:text-primary-text-dark text-lg font-semibold">
          Check In
        </h1>
        <h1 className="text-[#7e7e7e] dark:text-primary-text-dark text-lg font-semibold">
          Check Out
        </h1>
      </div>
      <div className=" mt-5 grid grid-cols-2 text-center">
        <div className="space-y-1 h-[80%] overflow-scroll">
          {user?.checkIn?.map((data, idx) => (
            <h1
              key={idx}
              className="text-[#7e7e7e] dark:text-secondary-text-dark"
            >
              {DateTime.fromJSDate(new Date()).toFormat("d") ===
                DateTime.fromMillis(data.toNumber() * 1000).toFormat("d") &&
                DateTime.fromMillis(data.toNumber() * 1000).toFormat("tt")}
            </h1>
          ))}
        </div>
        <div className="space-y-1 h-[80%] overflow-scroll">
          {user?.checkOut?.map((data, idx) => (
            <h1
              key={idx}
              className="text-[#7e7e7e] dark:text-secondary-text-dark"
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
