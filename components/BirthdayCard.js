import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { fetchOrganization, getAllUser } from "../helper";

const BirthdayCard = () => {
  const user = useSelector((state) => state.user);
  const [birthdays, setBirthdays] = useState({});
  const [employees, setEmployees] = useState([]);
  const currentDate = new Date().getDate();

  useEffect(async () => {
    let orgId = await fetchOrganization(user?.orgId);
    let users = orgId?.users;
    setEmployees(await getAllUser(users));
  }, [user]);

  const orgEmployees = () => {
    employees?.map((employee) => {
      new Date(employee.dob.toNumber()).getDate() === currentDate &&
        setBirthdays((prevState) => ({
          ...prevState,
          [employee.userAddress]: employee,
        }));
    });
  };

  useEffect(() => {
    orgEmployees();
  }, [employees]);

  return (
    <div
      className="shadow-base hover:shadow-medium dark:shadow-none dark:hover:shadow-none
      rounded-xl  transition-all duration-300 dark:bg-card min-h-[250px] pb-10 lg:hover:scale-[1.03]"
    >
      <div className="overflow-x-scroll overflow-y-scroll h-full w-full scrollbar-hide space-y-3 p-5">
        {Object.entries(birthdays).length > 0 ? (
          Object.entries(birthdays)?.map(([idx, birthday]) => (
            <Link href={`/profile/${birthday.userAddress}`} key={idx}>
              <div
                className="shadow-base lg:hover:shadow-medium dark:shadow-none lg:dark:hover:shadow-none p-1 px-2 rounded-xl flex items-center space-x-4
                cursor-pointer transition-all duration-300 mx-5  dark:bg-[#333333] lg:hover:scale-[1.03]"
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
          <div className="w-full h-full flex items-center justify-center">
            <img
              src="images/birthday.svg"
              alt=""
              className="w-[60%] h-auto dark:opacity-[0.85]"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default BirthdayCard;
