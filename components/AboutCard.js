import {
  DeviceMobileIcon,
  InformationCircleIcon,
  PencilAltIcon,
  ServerIcon,
  UserGroupIcon,
} from "@heroicons/react/outline";
import Link from "next/link";

import { useRecoilState } from "recoil";
import { userState } from "../atoms/user";

const AboutCard = ({ currentUser }) => {
  const user = useRecoilState(userState);

  return (
    <div
      className="shadow-base lg:hover:shadow-medium dark:shadow-none lg:dark:hover:shadow-none px-5 py-5 space-y-8 rounded-xl
    dark:bg-card transition-all duration-300 lg:hover:scale-[1.03]"
    >
      <div className="flex justify-between">
        <div className="flex items-center space-x-1">
          <h1 className="font-bold text-base-text-light dark:text-primary-text-dark">
            About
          </h1>
          <InformationCircleIcon className="w-[16px] h-[16px] text-primary-text-light font-medium dark:text-primary-text-dark" />
        </div>
        {currentUser.userAddress === user.userAddress && (
          <Link href={`/edit_user/${currentUser.userAddress}`}>
            <div className="flex items-center space-x-2 bg-[#333333] px-2 py-[1px] rounded-lg cursor-pointer">
              <h1 className="text-base-text-light dark:text-primary-text-dark">
                Edit
              </h1>
              <PencilAltIcon className="w-[16px] h-[16px] text-primary-text-light font-medium dark:text-primary-text-dark" />
            </div>
          </Link>
        )}
      </div>
      <div className="grid md:grid-cols-2 gap-10">
        {currentUser.team && (
          <div className="flex items-center space-x-2">
            <ServerIcon className="w-[16px] h-[16px] text-[#7f5af0]" />
            <h1 className="text-sm text-primary-text-light font-medium dark:text-secondary-text-dark">
              {currentUser.team}
            </h1>
          </div>
        )}
        {currentUser.role && (
          <div className="flex items-center space-x-2">
            <UserGroupIcon className="w-[16px] h-[16px] text-[#7f5af0]" />
            <h1 className="text-sm text-primary-text-light font-medium dark:text-secondary-text-dark">
              {currentUser.role}
            </h1>
          </div>
        )}
        {currentUser.mobile && (
          <div className="flex items-center space-x-2">
            <DeviceMobileIcon className="w-[16px] h-[16px] text-[#7f5af0]" />
            <h1 className="text-sm text-primary-text-light font-medium dark:text-secondary-text-dark">
              {currentUser.mobile}
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutCard;
