import { useRouter } from "next/router";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { changeUseremail } from "../helper";

const UpdateEmailCard = () => {
  const user = useSelector((state) => state.user);
  const [userEmail, setUserEmail] = useState("");
  const router = useRouter();
  return (
    <div
      className="rounded-xl dark:bg-card shadow-base hover:shadow-medium dark:shadow-none dark:hover:shadow-none
    lg:hover:scale-[1.03] transition-all duration-300"
    >
      <h1 className="text-center text-lg font-medium text-base-text-light dark:text-primary-text-dark p-2 border-b-2 border-secondary-text-dark">
        Update your email
      </h1>
      <div className="flex flex-col items-center space-y-3 m-5">
        <input
          type="email"
          placeholder="Enter your email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          className="border-2 border-primary-text-light dark:border-secondary-text-dark bg-transparent  w-[100%] rounded-xl outline-none
      text-primary-text-light font-semibold  placeholder:text-secondary-text-light placeholder:dark:text-secondary-text-dark
       dark:text-primary-text-dark px-2 py-1"
        />
        <button
          className="bg-bg-btn p-1 px-4 rounded-xl w-fit text-lg text-primary-text-light dark:text-base-text-dark font-medium"
          onClick={async () => {
            userEmail && (await changeUseremail(userEmail));
            setUserEmail("");
            router.push(`/profile/${user.userAddress}`);
          }}
        >
          Update Email
        </button>
      </div>
    </div>
  );
};

export default UpdateEmailCard;
