import { data } from "autoprefixer";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { searchUser } from "../helper";

const DepartmentCard = ({ users, department }) => {
  const [departmentUsers, setDepartmentUser] = useState({});

  useEffect(async () => {
    setDepartmentUser({});
    Object.entries(users)?.map((user) => {
      user[1]?.team === department &&
        setDepartmentUser((prevState) => {
          return { ...prevState, [user]: user[1] };
        });
    });
  }, [users]);

  // console.log(departmentUsers);

  return (
    <div className="shadow-equal-shadow dark:bg-card ">
      <h1 className="border-b border-gray-400 p-2 text-center text-lg font-medium text-gray-700 dark:text-primary-text rounded-sm">
        {department}
      </h1>
      <div className=" my-5 py-2 space-y-3 overflow-scroll h-[350px]">
        {Object.entries(departmentUsers)?.map(([idx, user]) => (
          <Link href={`/profile/${user.userAddress}`} key={idx}>
            <div
              className="shadow-equal-shadow  p-1 px-2 rounded-full flex items-center space-x-4
          cursor-pointer transition-all duration-300 mx-5 hover:m-3 dark:bg-[#333333]"
            >
              <div className="relative w-[32px] h-[32px] bg-yellow-500 rounded-full">
                <Image
                  src={user.avatar}
                  layout="fill"
                  className="rounded-full object-cover"
                />
              </div>
              <div>
                <h1 className="dark:text-primary-text">{user.name}</h1>
                <h1 className="text-xs text-gray-400 dark:text-secondary-text">
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
