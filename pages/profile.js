import React from "react";
import Image from "next/image";
import {
  CalendarIcon,
  ClockIcon,
  DeviceMobileIcon,
  InformationCircleIcon,
  ServerIcon,
  UserGroupIcon,
} from "@heroicons/react/outline";
import { useSelector } from "react-redux";

const profile = () => {
  const user = useSelector((state) => state.user);

  if (!user)
    return (
      <div className="flex items-center justify-center h-[calc(100vh-53px)]">
        <h1 className="text-2xl dark:text-primary-text ">
          You are not a part of this. Please contact your administrator
        </h1>
      </div>
    );

  return (
    <div>
      <div className="relative w-full h-[187px]">
        <Image
          src="https://images.unsplash.com/photo-1646546487804-85320b3b2540?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1110&q=80"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
        <div className="w-[100px] h-[100px] rounded-full relative top-[40px] m-auto border-2 z-[1]">
          <Image
            src={user.avatar}
            layout="fill"
            objectFit="cover"
            className="rounded-full"
          />
        </div>
        <div className="absolute bottom-2 w-full flex justify-center items-center z-[1]">
          <div className="flex space-x-16">
            <h1 className="text-white font-semibold">
              {user.userId ? user.userId.toNumber() : ""}
            </h1>
            <h1 className="text-white font-semibold">
              {user.role ? user.role : ""}
            </h1>
            <h1 className="text-white font-semibold">
              {user.team ? user.team : ""}
            </h1>
            <h1 className="text-white font-semibold">
              {user.email ? user.email : ""}
            </h1>
          </div>
        </div>
        <div className="w-full h-[150px] shadow-inner-shadow absolute bottom-0"></div>
      </div>

      <div className="flex">
        <div className="w-[200px] h-[calc(100vh-238px)] shadow-equal-shadow dark:bg-card">
          <h1 className="profile_sidebar-item">Profile</h1>
          <h1 className="profile_sidebar-item">Calendar</h1>
          <h1 className="profile_sidebar-item">Leave Tracker</h1>
          <h1 className="profile_sidebar-item">Time Tracker</h1>
          <h1 className="profile_sidebar-item">Attendance</h1>
          <h1 className="profile_sidebar-item">Files</h1>
        </div>
        <div className="grid lg:grid-cols-2 gap-5 m-5 w-[calc(100vw-200px)]">
          <div className="space-y-5">
            <div className="shadow-equal-shadow p-5 space-y-8 rounded-sm dark:bg-card hover:scale-[1.02] transition-all duration-300">
              <div className="flex items-center space-x-1">
                <h1 className="font-semibold dark:text-primary-text">
                  About me
                </h1>
                <InformationCircleIcon className="w-[16px] h-[16px] text-gray-700 dark:text-primary-text" />
              </div>
              <div className="grid md:grid-cols-2 gap-10 m-12">
                <div className="flex items-center space-x-2">
                  <ServerIcon className="w-[16px] h-[16px] text-[#00b4d8]" />
                  <h1 className="text-sm text-gray-700 dark:text-secondary-text">
                    {user.team ? user.team : ""}
                  </h1>
                </div>
                <div className="flex items-center space-x-2">
                  <UserGroupIcon className="w-[16px] h-[16px] text-[#00b4d8]" />
                  <h1 className="text-sm text-gray-700 dark:text-secondary-text">
                    {user.role ? user.role : ""}
                  </h1>
                </div>
                <div className="flex items-center space-x-2">
                  <DeviceMobileIcon className="w-[16px] h-[16px] text-[#00b4d8]" />
                  <h1 className="text-sm text-gray-700 dark:text-secondary-text">
                    8769973256
                  </h1>
                </div>
                <div className="flex items-center space-x-2">
                  <CalendarIcon className="w-[16px] h-[16px] text-[#00b4d8]" />
                  <h1 className="text-sm text-gray-700 dark:text-secondary-text">
                    Trainee
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
            <div className="shadow-equal-shadow p-5 space-y-8 rounded-sm dark:bg-card hover:scale-[1.02] transition-all duration-300">
              <h1 className="font-semibold dark:text-primary-text">
                Skill Set
              </h1>
              <div className="grid md:grid-cols-2 gap-10 m-12">
                {user.skills.split(",").map((skill, idx) => (
                  <h1
                    key={idx}
                    className="text-sm text-gray-700 dark:text-secondary-text"
                  >
                    {skill}
                  </h1>
                ))}
              </div>
            </div>
          </div>
          <div className="">
            <div className="shadow-equal-shadow p-5 space-y-8 rounded-sm dark:bg-card hover:scale-[1.02] transition-all duration-300">
              <h1 className="font-semibold dark:text-primary-text">
                Reporting To
              </h1>
              <div className="grid md:grid-cols-2 gap-10 m-12">
                <h1 className="text-sm text-gray-700 dark:text-secondary-text">
                  Blockchain Development
                </h1>
                <h1 className="text-sm text-gray-700 dark:text-secondary-text">
                  Web Development
                </h1>
                <h1 className="text-sm text-gray-700 dark:text-secondary-text">
                  UI/UX Design
                </h1>
                <h1 className="text-sm text-gray-700 dark:text-secondary-text">
                  Teaching
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default profile;
