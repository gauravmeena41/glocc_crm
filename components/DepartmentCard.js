import { data } from "autoprefixer";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { searchUser } from "../helper";

const DepartmentCard = ({ users, departments }) => {
  const [departmentUsers, setDepartmentUser] = useState({});
  const [currentDepartment, setCurrentDepartment] = useState("");

  useEffect(async () => {
    setDepartmentUser({});
    users?.map((user) => {
      user.team === currentDepartment &&
        setDepartmentUser((prevState) => {
          return { ...prevState, [user.userAddress]: user };
        });
    });
  }, [users, currentDepartment]);

  useEffect(() => {
    departments && setCurrentDepartment(departments[0]);
  }, [users]);

  return (
    <div className="shadow-base lg:hover:shadow-medium dark:shadow-none lg:dark:hover:shadow-none dark:bg-card rounded-xl">
      <div className="border-b-2 border-secondary-text-dark">
        <select
          onChange={(e) => setCurrentDepartment(e.target.value)}
          className="w-full outline-none border-none bg-transparent text-base-text-light dark:text-primary-text-dark p-2 font-medium
        text-lg rounded-t-xl text-center cursor-pointer"
        >
          {departments?.map((department, idx) => (
            <option key={idx} className="dark:bg-[#333333]" value={department}>
              {department}
            </option>
          ))}
        </select>
      </div>
      <div className=" my-5 py-2 space-y-3 overflow-scroll h-[350px]">
        {Object.entries(departmentUsers)?.map(([idx, user]) => (
          <Link href={`/profile/${user.userAddress}`} key={idx}>
            <div
              className="shadow-base lg:hover:shadow-medium dark:shadow-none lg:dark:hover:shadow-none p-1 px-2 rounded-xl flex items-center space-x-4
          cursor-pointer transition-all duration-300 mx-5  dark:bg-[#333333] lg:hover:scale-[1.03]"
            >
              <div className="relative w-[32px] h-[32px] bg-bg-danger rounded-full">
                <Image
                  src={user.avatar}
                  layout="fill"
                  className="rounded-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-base-text-light dark:text-base-text-dark font-medium ">
                  {user.name}
                </h1>
                <h1 className="text-xs text-secondary-text-light dark:text-primary-text-dark dark:text-secondary-text">
                  {user.role}
                </h1>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DepartmentCard;
