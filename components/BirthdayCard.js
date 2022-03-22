import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import Link from "next/link";
import Image from "next/image";
import { employeesState } from "../atoms/employees";

const BirthdayCard = () => {
  const [birthdays, setBirthdays] = useState({});
  const employees = useRecoilValue(employeesState);
  const currentDate = new Date().getDate();

  const orgEmployees = () => {
    employees?.map((employee) => {
      new Date(employee.dob.toNumber()).getDate() === currentDate &&
        setBirthdays((prevState) => ({
          ...prevState,
          [employee.userAddress]: employee,
        }));
    });
  };

  useEffect(async () => {
    orgEmployees();
  }, [employees]);

  return (
    <div
      className="shadow-medium dark:shadow-none bg-[#fff] dark:bg-card rounded-2xl
      transition-all duration-300 ease-in-out min-h-[250px] pb-10 sm:pb-0 w-full"
    >
      <div className="overflow-scroll h-full w-full scrollbar-hide space-y-3 p-5">
        {Object.entries(birthdays).length > 0 ? (
          Object.entries(birthdays)?.map(([idx, birthday]) => (
            <Link href={`/profile/${birthday.userAddress}`} key={idx}>
              <div
                className="shadow-base dark:shadow-none lg:hover:shadow-medium  lg:dark:hover:shadow-none p-1 px-2 rounded-2xl flex items-center space-x-4
                cursor-pointer transition-all duration-300 mx-5  dark:bg-[#333333]"
              >
                <div className="relative w-[32px] h-[32px] bg-bg-danger rounded-full">
                  <Image
                    src={birthday.avatar}
                    layout="fill"
                    className="rounded-full object-cover"
                  />
                </div>
                <div>
                  <h1 className="text-base-text-light dark:text-base-text-dark font-medium ">
                    {birthday.name}
                  </h1>
                  <h1 className="text-xs text-secondary-text-light dark:text-primary-text-dark dark:text-secondary-text">
                    {birthday.role}
                  </h1>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <div className="relative w-[200px] h-[200px] dark:opacity-[0.85]">
              <Image
                src="/images/birthday.svg"
                layout="fill"
                className="object-contain"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BirthdayCard;
