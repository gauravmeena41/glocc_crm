import React, { useEffect } from "react";
import UpdateUserCard from "../../components/UpdateUserCard";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { userState } from "../../atoms/user";

const edit_user = () => {
  const [user, setUser] = useRecoilState(userState);
  const router = useRouter();

  useEffect(() => {
    !user && router.push("/");
  }, [user]);
  return (
    <div className="flex items-center justify-center w-full h-screen m-6">
      <UpdateUserCard />
    </div>
  );
};

export default edit_user;
