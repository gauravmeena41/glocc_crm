import Link from "next/link";
import { SearchIcon } from "@heroicons/react/solid";
import Image from "next/image";
import { loginUser } from "../helper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../redux/index";

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const { addUser, removeUser } = bindActionCreators(actionCreators, dispatch);

  if (
    user == null ||
    user.userAddress === "0x0000000000000000000000000000000000000000"
  ) {
    addUser(null);
  }

  useEffect(async () => {
    addUser(await loginUser());
  }, []);

  return (
    <nav className="flex items-center justify-between p-1 md:p-2 px-5 border-b bg-gray-50 dark:border-gray-500 dark:bg-background">
      <div>
        <Link href="/">
          <h1 className="font-bold text-xl md:text-2xl text-gray-600 dark:text-primary-text cursor-pointer">
            GLLOC
          </h1>
        </Link>
      </div>
      <div className=" flex items-center justify-center">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="relative flex items-center"
        >
          <input
            type="text"
            className="rounded text-md text-gray-600 dark:text-white bg-transparent font-semibold md:w-[400px]
            px-1 py-[1px] md:py-1 shadow border dark:border-gray-500 outline-none cursor-text placeholder:text-secondary-text"
            placeholder="Search Employee"
          />
          <SearchIcon className="w-[18px] h-[18px] absolute right-1 text-gray-400 dark:text-primary-text" />
        </form>
      </div>
      <div className="flex items-center">
        {user ? (
          <Link href={`/profile/${user.userAddress}`}>
            <div className="rounded-full cursor-pointer flex items-center border-2 dark:border-gray-500 p-[1px] bg-yellow-500">
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
          </Link>
        ) : (
          <button
            onClick={async () => addUser(await loginUser())}
            className="shadow active:shadow-md font-semibold px-3 py-[2px] rounded transition-all duration-200
            dark:bg-secondary-text"
          >
            Log in
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
