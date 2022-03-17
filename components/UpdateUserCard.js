import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { updateUser } from "../helper";

const UpdateUserCard = () => {
  const user = useSelector((state) => state.user);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userMobile, setUserMobile] = useState("");
  const [userSkills, setUserSkills] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [dob, setDob] = useState(new Date().getTime());

  useEffect(() => {
    user.dob.toNumber() && setDob(user.dob);
  }, []);

  return (
    <div
      className="rounded-xl dark:bg-card shadow-base hover:shadow-medium dark:shadow-none dark:hover:shadow-none
  lg:hover:scale-[1.03] transition-all duration-300 w-full max-w-[500px] min-h-[250px] m-5"
    >
      <h1 className="text-center text-lg font-medium text-base-text-light dark:text-primary-text-dark p-2 border-b-2 border-secondary-text-dark">
        Update your profile
      </h1>
      <div className="flex flex-col items-center space-y-3 m-5">
        <input
          type="text"
          placeholder={user.name}
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="border-2 border-primary-text-light dark:border-secondary-text-dark bg-transparent  w-[100%] rounded-xl outline-none
    text-primary-text-light font-semibold  placeholder:text-secondary-text-light placeholder:dark:text-secondary-text-dark
     dark:text-primary-text-dark px-2 py-1"
        />
        <input
          type="text"
          placeholder={user.email}
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          className="border-2 border-primary-text-light dark:border-secondary-text-dark bg-transparent  w-[100%] rounded-xl outline-none
    text-primary-text-light font-semibold  placeholder:text-secondary-text-light placeholder:dark:text-secondary-text-dark
     dark:text-primary-text-dark px-2 py-1"
        />
        <input
          type="text"
          placeholder={user.mobile ? user.mobile : "your mobile"}
          value={userMobile}
          onChange={(e) => setUserMobile(e.target.value)}
          className="border-2 border-primary-text-light dark:border-secondary-text-dark bg-transparent  w-[100%] rounded-xl outline-none
    text-primary-text-light font-semibold  placeholder:text-secondary-text-light placeholder:dark:text-secondary-text-dark
     dark:text-primary-text-dark px-2 py-1"
        />
        <select
          defaultValue=""
          onChange={(e) => setMaritalStatus(e.target.value)}
          className="dark:bg-[#333333] text-base-text-light dark:text-primary-text-dark border-0 outline-none w-full rounded-lg p-1"
        >
          <option disabled value="">
            Marital Status
          </option>
          <option value="Single">Single</option>
          <option value="Married">Married</option>
        </select>
        <input
          className="outline-none border-0 dark:bg-[#333333] w-full rounded-lg p-1 text-base-text-light dark:text-primary-text-dark"
          type="date"
          onChange={(e) => setDob(new Date(e.target.value).getTime())}
        />
        <input
          type="text"
          placeholder={user.skills ? user.skills : "your skills"}
          value={userSkills}
          onChange={(e) => setUserSkills(e.target.value)}
          className="border-2 border-primary-text-light dark:border-secondary-text-dark bg-transparent  w-[100%] rounded-xl outline-none
    text-primary-text-light font-semibold  placeholder:text-secondary-text-light placeholder:dark:text-secondary-text-dark
     dark:text-primary-text-dark px-2 py-1"
        />
        <h1 className="text-[10px] text-bg-btn">
          Write your skils in comma separated format
        </h1>

        {(userName ||
          userEmail ||
          userMobile ||
          userSkills ||
          maritalStatus ||
          dob) && (
          <button
            className="bg-bg-btn p-1 px-4 rounded-xl w-fit text-lg text-primary-text-light dark:text-base-text-dark font-medium animate-slide-down"
            onClick={async () => {
              await updateUser(
                userName,
                userEmail,
                userMobile,
                userSkills,
                userAvatar,
                maritalStatus,
                dob
              );
              setUserName("");
              setUserEmail("");
              setUserMobile("");
              setUserSkills("");
              setUserAvatar("");
              setMaritalStatus("");
              setDob("");
            }}
          >
            Update Your Details
          </button>
        )}
      </div>
    </div>
  );
};

export default UpdateUserCard;
