import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { loginUser } from "../helper";
import { actionCreators } from "../redux";
import AttendanceCard from "./AttendanceCard";
import BirthdayCard from "./BirthdayCard";
import TasksCard from "./TasksCard";
import WeatherCard from "./WeatherCard";

const Mainbar = () => {
  const dispatch = useDispatch();
  const { addUser } = bindActionCreators(actionCreators, dispatch);

  useEffect(async () => {
    addUser(await loginUser());
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
