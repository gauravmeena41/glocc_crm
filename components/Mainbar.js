import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../atoms/user";
import { loginUser } from "../helper";
import AttendanceCard from "./AttendanceCard";
import BirthdayCard from "./BirthdayCard";
import TasksCard from "./TasksCard";
import WeatherCard from "./WeatherCard";

const Mainbar = () => {
  const [user, setUser] = useRecoilState(userState);
  useEffect(async () => {
    setUser(await loginUser());
  }, []);

  return (
    <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5 m-5">
      <WeatherCard />
      <TasksCard />
      <BirthdayCard />
      <AttendanceCard />
    </div>
  );
};

export default Mainbar;
