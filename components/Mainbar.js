import AttendanceCard from "./AttendanceCard";
import BirthdayCard from "./BirthdayCard";
import TasksCard from "./TasksCard";
import WeatherCard from "./WeatherCard";

const Mainbar = () => {
  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-2 w-full">
      <WeatherCard />
      <TasksCard />
      <BirthdayCard />
      <AttendanceCard />
    </div>
  );
};

export default Mainbar;
