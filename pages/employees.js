import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchOrganization, searchUser } from "../helper";
import Link from "next/link";

const employees = () => {
  const user = useSelector((state) => state.user);
  const [employees, setEmployees] = useState({});
  const [currentUser, setCurrentUser] = useState([]);

  useEffect(async () => {
    let res = await fetchOrganization(user?.orgId);
    setEmployees({});
    res?.users?.map(async (user) => {
      let data = await searchUser(user);
      setEmployees((prevState) => {
        return { ...prevState, [user]: data };
      });
    });
  }, [user]);

  return (
    <div className="grid sm:grid-cols-2 m-10 gap-10 rounded-sm">
      <div className=" gap-5 bg-white dark:bg-card shadow-equal-shadow">
        <div className="border-b border-secondary-text p-2 text-lg font-medium text-center">
          <h1>Employees</h1>
        </div>
        <div className="m-5 p-2 space-y-3 overflow-scroll">
          {Object.entries(employees)?.map(([idx, value]) => (
            <div
              key={idx}
              className="shadow-equal-shadow  p-1 px-2 rounded-full flex items-center space-x-4
              cursor-pointer transition-all duration-300 mx-5 hover:m-3 dark:bg-[#333333]"
              onClick={() => setCurrentUser(value)}
            >
              <div className="relative w-[38px] h-[38px] rounded-full bg-yellow-500">
                <Image
                  src={value.avatar}
                  layout="fill"
                  className="rounded-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <h1>{value.name}</h1>
                <h1 className="text-xs dark:text-secondary-text">
                  {value.role}
                </h1>
              </div>
            </div>
          ))}
        </div>
      </div>
      {currentUser.length > 0 && (
        <div className="hidden sm:flex flex-col dark:bg-card relative shadow-equal-shadow">
          <Link href={`profile/${currentUser.userAddress}`}>
            <button
              className="absolute top-2 right-2 dark:bg-[#333333] shadow-equal-shadow
            px-2 py-1 hover:scale-105 transition-all duration-300"
            >
              View Profile
            </button>
          </Link>
          <div className="flex items-center justify-center  w-full h-[150px]">
            <div className="relative w-[100px] h-[100px] bg-yellow-500 rounded-full">
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
              <h1 className=" text-xl font-medium">{currentUser.name}</h1>
              <p className="text-xs text-secondary-text">{currentUser.role}</p>
            </div>
            <div className="m-5 space-y-5">
              <h1 className="text-xl text-center font-semibold border-b border-secondary-text">
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
