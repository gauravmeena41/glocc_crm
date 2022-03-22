import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../atoms/user";
import { loginUser } from "../helper";
import AttendanceCard from "./AttendanceCard";
import BirthdayCard from "./BirthdayCard";
import HolidaysCard from "./HolidaysCard";
import TasksCard from "./TasksCard";
import WeatherCard from "./WeatherCard";

const Mainbar = () => {
  const [user, setUser] = useRecoilState(userState);
  useEffect(async () => {
    setUser(await loginUser());
  }, []);

  return (
    <div className=" grid grid-rows-2 sm:grid-cols-2 xl:grid-cols-3 gap-5 p-6 w-full">
      <WeatherCard />
      <TasksCard />
      <BirthdayCard />
      <AttendanceCard />
      <HolidaysCard />
    </div>
  );
};

export default Mainbar;
