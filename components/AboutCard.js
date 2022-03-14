import {
  CalendarIcon,
  ClockIcon,
  DeviceMobileIcon,
  InformationCircleIcon,
  ServerIcon,
  UserGroupIcon,
} from "@heroicons/react/outline";

const AboutCard = ({ currentUser }) => {
  return (
    <div
      className="shadow-base lg:hover:shadow-medium dark:shadow-none lg:dark:hover:shadow-none px-5 py-5 space-y-8 rounded-xl
    dark:bg-card transition-all duration-300 lg:hover:scale-[1.03]"
    >
      <div className="flex items-center space-x-1">
        <h1 className="font-bold text-base-text-light dark:text-base-text-dark">
          About
        </h1>
        <InformationCircleIcon className="w-[16px] h-[16px] text-primary-text-light font-medium dark:text-primary-text-dark" />
      </div>
      <div className="grid md:grid-cols-2 gap-10">
        <div className="flex items-center space-x-2">
          <ServerIcon className="w-[16px] h-[16px] text-[#7f5af0]" />
          <h1 className="text-sm text-primary-text-light font-medium dark:text-secondary-text-dark">
            {currentUser.team ? currentUser.team : ""}
          </h1>
        </div>
        <div className="flex items-center space-x-2">
          <UserGroupIcon className="w-[16px] h-[16px] text-[#7f5af0]" />
          <h1 className="text-sm text-primary-text-light font-medium dark:text-secondary-text-dark">
            {currentUser.role ? currentUser.role : ""}
          </h1>
        </div>
        <div className="flex items-center space-x-2">
          <DeviceMobileIcon className="w-[16px] h-[16px] text-[#7f5af0]" />
          <h1 className="text-sm text-primary-text-light font-medium dark:text-secondary-text-dark">
            {currentUser.mobile ? currentUser.mobile : ""}
          </h1>
        </div>
        <div className="flex items-center space-x-2">
          <ClockIcon className="w-[16px] h-[16px] text-[#7f5af0]" />
          <h1 className="text-sm text-primary-text-light font-medium dark:text-secondary-text-dark">
            (GMT+5:30)
          </h1>
        </div>
      </div>
    </div>
  );
};

export default AboutCard;
