import React, { useEffect, useState } from "react";
import Image from "next/image";

import { useRecoilState } from "recoil";
import { userState } from "../../atoms/user";
import { useRouter } from "next/router";
import { searchUser } from "../../helper";
import MarkAttendanceCard from "../../components/MarkAttendanceCard";
import AboutCard from "../../components/AboutCard";
import SkillCard from "../../components/SkillCard";
import BasicinfoCard from "../../components/BasicinfoCard";
import WalletCard from "../../components/WalletCard";

const profile = () => {
  const [user] = useRecoilState(userState);
  const [currentUser, setCurrentUser] = useState(null);
  const router = useRouter();
  const { id: currentUserId } = router.query;

  useEffect(async () => {
    setCurrentUser(await searchUser(currentUserId));
  }, [currentUserId]);

  if (!currentUser)
    return (
      <div className="flex items-center justify-center h-[calc(100vh-53px)]">
        <h1 className="text-2xl dark:text-primary-text-dark ">
          You are not a part of this. Please contact your administrator
        </h1>
      </div>
    );

  return (
    <div className="w-full">
      <div className="relative h-[187px]">
        <Image
          src="https://images.unsplash.com/photo-1626465894806-ba29bfbee59a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80"
          layout="fill"
          className="object-cover"
        />
        <div className="relative w-[100px] h-[100px] rounded-full  top-[40px] m-auto border-2 z-[1] bg-bg-danger">
          <Image
            src={currentUser?.avatar}
            layout="fill"
<<<<<<< HEAD
            className="rounded-full object-cover"
=======
            className="rounded-full object-cover object-top"
>>>>>>> dev
          />
        </div>
        <div className="absolute bottom-2 w-full hidden lg:flex justify-center items-center z-[1] ">
          <div className="flex space-x-16">
            <h1 className="text-white font-semibold">
              {currentUser?.userId ? currentUser?.userId.toNumber() : ""}
            </h1>
            <h1 className="text-white font-semibold">
              {currentUser?.role ? currentUser?.role : ""}
            </h1>
            <h1 className="text-white font-semibold">
              {currentUser?.team ? currentUser?.team : ""}
            </h1>
            <h1 className="text-white font-semibold">
              {currentUser?.email ? currentUser?.email : ""}
            </h1>
          </div>
        </div>
        <div className="w-full h-[150px] shadow-inner-shadow absolute bottom-0"></div>
      </div>

      <div>
<<<<<<< HEAD
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 m-2 lg:m-5">
=======
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 m-2 sm:m-5">
>>>>>>> dev
          <AboutCard currentUser={currentUser} />
          {currentUser?.userAddress === user?.userAddress && (
            <MarkAttendanceCard />
          )}
          <SkillCard currentUser={currentUser} />
          <BasicinfoCard currentUser={currentUser} />
          <WalletCard currentUser={currentUser} />
        </div>
      </div>
    </div>
  );
};

export default profile;
