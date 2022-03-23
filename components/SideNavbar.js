import { useEffect, useState } from "react";
import { LogoutIcon } from "@heroicons/react/outline";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { userState } from "../atoms/user";
import { employeesState } from "../atoms/employees";
import { orgState } from "../atoms/org";
import { fetchOrganization, getAllUser, loginUser } from "../helper";

const SideNavbar = ({ setIsSidebarShow, setShowMenu }) => {
  const [user, setUser] = useRecoilState(userState);
  const [loadData, setLoadData] = useState(false);
  const [employees, setEmployees] = useRecoilState(employeesState);
  const [orgData, setOrgData] = useRecoilState(orgState);
  const router = useRouter();

  const fetchEmployees = async () => {
    let org = await fetchOrganization(user?.orgId);
    let users = await getAllUser(org?.users, org?.orgId);
    setEmployees(users);
    setOrgData(org);
    setLoadData(true);
  };

  useEffect(async () => {
    setUser(await loginUser());
    await fetchEmployees();
    user && setShowMenu(true);
    !user && router.push("/create_org");
  }, [loadData]);

  return (
    <div className="h-screen bg-[#fff] dark:bg-[#333333] rounded-r-2xl flex flex-col justify-between p-10 shadow-medium dark:shadow-none">
      <Link href="/">
        <div onClick={() => setIsSidebarShow(false)}>
          <h1 className="text-3xl font-semibold cursor-pointer dark:text-[#fff]">
            GLLOC
          </h1>
        </div>
      </Link>
      <Link href="/organization">
        <div onClick={() => setIsSidebarShow(false)}>
          <p className="text-xl text-gray-400 hover:text-primary-text-light dark:hover:text-base-text-dark font-semibold cursor-pointer transition-all duration-300">
            Organization
          </p>
        </div>
      </Link>
      <Link href="/employees">
        <div onClick={() => setIsSidebarShow(false)}>
          <p className="text-xl text-gray-400 hover:text-primary-text-light dark:hover:text-base-text-dark font-semibold cursor-pointer transition-all duration-300">
            Employees
          </p>
        </div>
      </Link>
      <div onClick={() => setIsSidebarShow(false)}>
        <p className="text-xl text-gray-400 hover:text-primary-text-light dark:hover:text-base-text-dark font-semibold cursor-pointer transition-all duration-300">
          File
        </p>
      </div>
      <div onClick={() => setIsSidebarShow(false)}>
        <p className="text-xl text-gray-400 hover:text-primary-text-light dark:hover:text-base-text-dark font-semibold cursor-pointer transition-all duration-300">
          Complaints
        </p>
      </div>
      <div className="flex items-center space-x-5">
        {user && (
          <>
            <Link href={`/profile/${user?.userAddress}`}>
              <div
                className="rounded-full w-[42px] h-[42px] relative cursor-pointer border-2"
                onClick={() => setIsSidebarShow(false)}
              >
                <Image
                  src={
                    user.avatar
                      ? user.avatar
                      : "https://images.unsplash.com/photo-1598529262041-a9cce4be9fca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80"
                  }
                  layout="fill"
                  className="rounded-full object-cover object-top"
                />
              </div>
            </Link>
            <div className="flex items-center space-x-2 cursor-pointer text-xl text-gray-400 hover:text-base-text-light dark:hover:text-base-text-dark  font-semibold transition-all duration-300">
              <p>Log out</p>
              <LogoutIcon className="w-6 h-6" />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SideNavbar;
