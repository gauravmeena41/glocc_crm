import { useRecoilState } from "recoil";
import { useState, useEffect } from "react";
import { userState } from "../atoms/user";

const AttendanceCard = () => {
  const [user] = useRecoilState(userState);

  const [time, setTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    let millis = 0;
    user?.checkOut?.map((data, idx) => {
      millis +=
        user?.checkOut[idx]?.toNumber() - user?.checkIn[idx]?.toNumber();
    });
    let hours = Math.floor(millis / 3600);
    millis = millis % 3600;
    let minutes = Math.floor(millis / 60);
    millis = millis % 60;

    setTime({
      hours: hours,
      minutes: minutes,
      seconds: millis,
    });
  }, []);

  return (
    <div
      className="shadow-medium dark:shadow-none bg-[#fff] dark:bg-card rounded-2xl
      transition-all duration-300 ease-in-out h-full overflow-hidden w-full grid grid-rows-2"
    >
      <div className="flex items-center justify-center w-full h-full bg-bg-btn">
        <h1 className="text-primary-text-light dark:text-base-text-dark text-[5rem]">
          {` ${time.hours < 10 ? `0${time.hours}` : time.hours} : ${
            time.minutes < 10 ? `0${time.minutes}` : time.minutes
          } : ${time.seconds < 10 ? `0${time.seconds}` : time.seconds}`}
        </h1>
      </div>
      <div className="flex items-center justify-center bg-bg-danger">
        <h1 className="text-[5rem] text-base-text-dark">IN OFFICE</h1>
      </div>
    </div>
  );
};

export default AttendanceCard;
