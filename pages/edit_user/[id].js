import React, { useEffect } from "react";
import UpdateUserCard from "../../components/UpdateUserCard";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const edit_user = () => {
  const user = useSelector((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    !user && router.push("/");
  }, [user]);
  return (
    <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-5 m-5">
      <UpdateUserCard />
    </div>
  );
};

export default edit_user;
