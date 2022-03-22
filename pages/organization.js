import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../atoms/user";
import CEOOnlyAction from "../components/CEOOnlyAction";
import DepartmentCard from "../components/DepartmentCard";

const organization = () => {
  const [user] = useRecoilState(userState);
  const router = useRouter();

  useEffect(async () => {
    !user && router.push("/");
  }, []);

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 m-6 gap-10 w-full">
      <DepartmentCard />
      {user && user.role === "Chief Executive Officer" && <CEOOnlyAction />}
    </div>
  );
};

export default organization;
