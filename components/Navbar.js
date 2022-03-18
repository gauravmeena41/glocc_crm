import Link from "next/link";
import { SearchIcon } from "@heroicons/react/solid";
import Image from "next/image";
import { loginUser } from "../helper";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useRecoilState } from "recoil";
import { userState } from "../atoms/user";

const Navbar = () => {
  const [user, setUser] = useRecoilState(userState);
  const [isSidebarShow, setIsSidebarShow] = useState(false);

  if (
    user == null ||
    user.userAddress === "0x0000000000000000000000000000000000000000"
  ) {
    setUser(null);
  }

  useEffect(async () => {
    setUser(await loginUser());
    console.log(user);
  }, []);

  return (
    <>
      <nav
        className={`flex items-center justify-between p-1 md:p-2 md:px-5 border-b rounded-b-xl dark:border-gray-500 dark:bg-[#333333]`}
      >
        <div onClick={() => setIsSidebarShow(false)}>
          <Link href="/">
            <h1 className="font-bold text-xl md:text-2xl text-base-text-light dark:text-base-text-dark cursor-pointer">
              GLLOC
            </h1>
          </Link>
        </div>
        <div className="hidden lg:flex items-center justify-center">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="relative flex items-center"
          >
            <input
              type="text"
              className="border-2 border-primary-text-light text-md text-primary-text-light  bg-transparent font-semibold md:w-[400px]
            px-1 py-[1px] md:py-1  dark:border-primary-text-dark outline-none cursor-text placeholder:text-secondary-text-light dark:text-primary-text-dark dark:placeholder:text-secondary-text-dark rounded-xl"
              placeholder="Search Employee"
            />
            <SearchIcon className="w-[24px] h-[24px] absolute right-1 text-secondary-text-light  dark:text-primary-text-dark" />
          </form>
        </div>
        <div className="flex items-center">
          {user ? (
            <div
              className="rounded-full cursor-pointer flex items-center border-2 dark:border-gray-500 p-[1px] bg-bg-danger"
              onClick={() => setIsSidebarShow(!isSidebarShow)}
            >
              <Image
                src={
                  user.avatar
                    ? user.avatar
                    : "https://images.unsplash.com/photo-1598529262041-a9cce4be9fca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80"
                }
                className="rounded-full object-cover"
                width={30}
                height={30}
                alt=""
              />
            </div>
          ) : (
            <button
              onClick={async () => setUser(await loginUser())}
              className="shadow active:shadow-md font-semibold px-3 py-[2px] rounded transition-all duration-200
          dark:bg-secondary-text"
            >
              Log in
            </button>
          )}
        </div>
      </nav>
      {user && (
        <div className="relative">
          <div
            className={`${
              isSidebarShow ? "inline-block animate-slide-down" : "hidden"
            }  absolute -top-2 z-[2] transition-all duration-300 `}
          >
            <Sidebar
              isSidebarShow={isSidebarShow}
              setIsSidebarShow={setIsSidebarShow}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
