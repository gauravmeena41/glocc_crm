import { IdentificationIcon } from "@heroicons/react/outline";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { fetchOrganization } from "../helper";

const BasicinfoCard = ({ currentUser }) => {
  const [orgData, setOrgData] = useState([]);
  useEffect(async () => {
    setOrgData(await fetchOrganization(currentUser.userAddress));
  }, [currentUser]);

  return (
    <div className="space-y-5">
      <div
        className="shadow-base lg:hover:shadow-medium dark:shadow-none lg:dark:hover:shadow-none px-5 py-5 space-y-8 font-semibold
      w-full h-full rounded-xl dark:bg-card transition-all duration-300 lg:hover:scale-[1.03]"
      >
        <h1 className="font-bold text-base-text-light dark:text-primary-text-dark flex items-center">
          Basic Info
          <IdentificationIcon className="w-[16px] h-[16px] text-primary-text-light font-medium dark:text-primary-text-dark ml-1" />
        </h1>
        <div>
          <div className="grid grid-cols-3 border-b border-base-text-light dark:border-secondary-text-dark mt-5">
            <h1 className="col-span-1 text-base-text-light dark:text-primary-text-dark mb-2">
              Organization
            </h1>
            <p className="col-span-2 text-base-text-light dark:text-secondary-text-dark font-normal mb-2">
              {orgData.name}
            </p>
          </div>
          <div className="grid grid-cols-3 border-b border-base-text-light dark:border-secondary-text-dark mt-5">
            <h1 className="col-span-1 text-base-text-light dark:text-primary-text-dark mb-2">
              EmployeeID
            </h1>
            <p className="col-span-2 text-base-text-light dark:text-secondary-text-dark font-normal mb-2">
              {currentUser.userId.toNumber()}
            </p>
          </div>
          <div className="grid grid-cols-3 border-b border-base-text-light dark:border-secondary-text-dark mt-5">
            <h1 className="col-span-1 text-base-text-light dark:text-primary-text-dark mb-2">
              Name
            </h1>
            <p className="col-span-2 text-base-text-light dark:text-secondary-text-dark font-normal mb-2">
              {currentUser.name}
            </p>
          </div>
          <div className="grid grid-cols-3 border-b border-base-text-light dark:border-secondary-text-dark mt-5">
            <h1 className="col-span-1 text-base-text-light dark:text-primary-text-dark mb-2">
              Email ID
            </h1>
            <p className="col-span-2 text-base-text-light dark:text-secondary-text-dark font-normal mb-2">
              {currentUser.email}
            </p>
          </div>
          <div className="grid grid-cols-3 border-b border-base-text-light dark:border-secondary-text-dark mt-5">
            <h1 className="col-span-1 text-base-text-light dark:text-primary-text-dark mb-2">
              Birth Date
            </h1>
            <p className="col-span-2 text-base-text-light dark:text-secondary-text-dark font-normal mb-2">
              {DateTime.fromMillis(currentUser?.dob.toNumber()).toFormat("DDD")}
            </p>
          </div>
          <div className="grid grid-cols-3 border-b border-base-text-light dark:border-secondary-text-dark mt-5">
            <h1 className="col-span-1 text-base-text-light dark:text-primary-text-dark mb-2">
              Age
            </h1>
            <p className="col-span-2 text-base-text-light dark:text-secondary-text-dark font-normal mb-2">
              {currentUser.dob
                ? Math.floor(
                    (new Date().getTime() - currentUser.dob.toNumber()) /
                      (1000 * 60 * 60 * 24 * 365)
                  )
                : ""}{" "}
              years
            </p>
          </div>
          <div className="grid grid-cols-3 border-b border-base-text-light dark:border-secondary-text-dark mt-5">
            <h1 className="col-span-1 text-base-text-light dark:text-primary-text-dark mb-2">
              Marital Status
            </h1>
            <p className="col-span-2 text-base-text-light dark:text-secondary-text-dark font-normal mb-2">
              {currentUser.maritalStatus}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicinfoCard;
