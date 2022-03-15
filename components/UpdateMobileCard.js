import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { changeUsermobile } from "../helper";

const UpdateMobileCard = () => {
  const user = useSelector((state) => state.user);
  const [userMobile, setUserMobile] = useState("");
  const router = useRouter();

  return (
    <div
      className="rounded-xl dark:bg-card shadow-base hover:shadow-medium dark:shadow-none dark:hover:shadow-none
    lg:hover:scale-[1.03] transition-all duration-300"
    >
      <h1 className="text-center text-lg font-medium text-base-text-light dark:text-primary-text-dark p-2 border-b-2 border-secondary-text-dark">
        Update your number
      </h1>
      <div className="flex flex-col items-center space-y-3 m-5">
        <input
          type="text"
          placeholder="Enter your number"
          value={userMobile}
          onChange={(e) => setUserMobile(e.target.value)}
          maxLength="10"
          className="border-2 border-primary-text-light dark:border-secondary-text-dark bg-transparent  w-[100%] rounded-xl outline-none
      text-primary-text-light font-semibold  placeholder:text-secondary-text-light placeholder:dark:text-secondary-text-dark
       dark:text-primary-text-dark px-2 py-1 scrollbar-hide"
        />
        <button
          className="bg-bg-btn p-1 px-4 rounded-xl w-fit text-lg text-primary-text-light dark:text-base-text-dark font-medium"
          onClick={async () => {
            userMobile && (await changeUsermobile(userMobile));
            setUserMobile("");
            router.push(`/profile/${user.userAddress}`);
          }}
        >
          Update Number
        </button>
      </div>
    </div>
  );
};

export default UpdateMobileCard;
