import Image from "next/image";
import { useEffect, useState } from "react";

import { useRecoilState } from "recoil";
import { userState } from "../atoms/user";
import { employeesState } from "../atoms/employees";
import { fetchOrganization, getAllUser, searchUser } from "../helper";
import Link from "next/link";

const employees = () => {
  const user = useRecoilState(userState);
  // const [employees, setEmployees] = useRecoilState(employeesState);
  const [employees, setEmployees] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);

  useEffect(async () => {
    let res = await fetchOrganization(user?.orgId);
    setEmployees(await getAllUser(res?.users));
  }, [user]);

  return (
    <div className="grid sm:grid-cols-2 m-5 md:m-10 gap-10">
      <div className="gap-5 dark:bg-card shadow-base lg:hover:shadow-medium dark:shadow-none lg:dark:hover:shadow-none rounded-xl">
        <div className="border-b-2 border-primary-text-light dark:border-secondary-text-dark p-2 text-xl text-base-text-light dark:text-primary-text-dark font-semibold text-center">
          <h1>Employees</h1>
        </div>
        <div className="mt-2 p-2 space-y-3 overflow-scroll min-h-[350px]">
          {employees <= 0 ? (
            <h1 className="w-full text-center text-xs font-medium text-primary-text-light dark:text-primary-text-dark">
              No employees in your organization
            </h1>
          ) : (
            employees?.map((value, idx) => (
              <div
                key={idx}
                className={`shadow-base lg:hover:shadow-medium dark:shadow-none lg:dark:hover:shadow-none p-1 px-2 rounded-xl flex items-center space-x-4
                cursor-pointer transition-all duration-300 md:mx-5 dark:bg-[#333333] ${
                  currentUser.name === value.name &&
                  "dark:bg-[#343a40] lg:scale-[1.03]"
                } lg:hover:scale-[1.03]`}
                onClick={() => setCurrentUser(value)}
              >
                <div className="relative w-[38px] h-[38px] rounded-full bg-bg-danger">
                  <Image
                    src={value.avatar}
                    layout="fill"
                    className="rounded-full object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <h1 className="text-primary-text-light font-medium dark:text-primary-text-dark">
                    {value.name}
                  </h1>
                  <h1 className="text-xs dark:text-secondary-text-dark">
                    {value.role}
                  </h1>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      {currentUser.length > 0 && (
        <div className="sm:flex flex-col dark:bg-card relative shadow-base lg:hover:shadow-medium dark:shadow-none lg:dark:hover:shadow-none rounded-xl animate-slide-down transition-all duration-300 ">
          <Link href={`profile/${currentUser.userAddress}`}>
            <button
              className="absolute top-2 right-2 text-base-text-light dark:text-base-text-dark rounded-xl font-medium dark:bg-[#333333] shadow-base lg:hover:shadow-medium dark:shadow-none lg:dark:hover:shadow-none
            px-2 py-1  transition-all duration-300"
            >
              View Profile
            </button>
          </Link>
          <div className="flex items-center justify-center  w-full h-[150px]">
            <div className="relative w-[100px] h-[100px] bg-bg-danger rounded-full">
              <Image
                src={currentUser?.avatar}
                alt=""
                layout="fill"
                className="rounded-full object-cover"
              />
            </div>
          </div>
          <div>
            <div className="text-center">
              <h1 className=" text-xl text-base-text-light dark:text-base-text-dark font-medium">
                {currentUser.name}
              </h1>
              <p className="text-xs text-secondary-text-light dark:text-secondary-text-dark">
                {currentUser.role}
              </p>
            </div>
            <div className="m-5 space-y-5">
              <h1 className="text-xl text-center font-semibold border-b-2 border-secondary-text-light dark:border-secondary-text-dark text-primary-text-light dark:text-primary-text-dark">
                Skills
              </h1>
              <div
                className={`grid ${
                  currentUser.skills && "sm:grid-cols-2"
                } gap-5`}
              >
                {currentUser.skills ? (
                  currentUser.skills
                    .split(",")
                    ?.map((skill) => <div>{skill}</div>)
                ) : (
                  <div className="flex items-center justify-center w-full h-full">
                    <img
                      src="images/skills.svg"
                      alt=""
                      className="w-[100%] max-w-[200px] dark:opacity-[0.85]"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default employees;
