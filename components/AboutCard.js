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
    <div className="shadow-equal-shadow lg:px-5 py-5 space-y-8 rounded-sm dark:bg-card  lg:hover:scale-[1.02] transition-all duration-300">
      <div className="flex items-center space-x-1">
        <h1 className="font-semibold dark:text-primary-text">About</h1>
        <InformationCircleIcon className="w-[16px] h-[16px] text-gray-700 dark:text-primary-text" />
      </div>
      <div className="grid md:grid-cols-2 gap-10 m-12">
        <div className="flex items-center space-x-2">
          <ServerIcon className="w-[16px] h-[16px] text-[#00b4d8]" />
          <h1 className="text-sm text-gray-700 dark:text-secondary-text">
            {currentUser.team ? currentUser.team : ""}
          </h1>
        </div>
        <div className="flex items-center space-x-2">
          <UserGroupIcon className="w-[16px] h-[16px] text-[#00b4d8]" />
          <h1 className="text-sm text-gray-700 dark:text-secondary-text">
            {currentUser.role ? currentUser.role : ""}
          </h1>
        </div>
        <div className="flex items-center space-x-2">
          <DeviceMobileIcon className="w-[16px] h-[16px] text-[#00b4d8]" />
          <h1 className="text-sm text-gray-700 dark:text-secondary-text">
            {currentUser.mobile ? currentUser.mobile : ""}
          </h1>
        </div>
        <div className="flex items-center space-x-2">
          <ClockIcon className="w-[16px] h-[16px] text-[#00b4d8]" />
          <h1 className="text-sm text-gray-700 dark:text-secondary-text">
            (GMT+5:30)
          </h1>
        </div>
      </div>
    </div>
  );
};

export default AboutCard;
