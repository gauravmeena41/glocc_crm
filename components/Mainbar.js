import AttendanceCard from "./AttendanceCard";
import BirthdayCard from "./BirthdayCard";
import TasksCard from "./TasksCard";
import WeatherCard from "./WeatherCard";

const Mainbar = () => {
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
