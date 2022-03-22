import { useState, useEffect } from "react";
import { LibraryIcon } from "@heroicons/react/outline";
import Image from "next/image";
import { getUserBalance, sendAmount } from "../helper";
import { useRecoilValue } from "recoil";
import { userState } from "../atoms/user";
import { employeesState } from "../atoms/employees";

const WalletCard = ({ currentUser }) => {
  const user = useRecoilValue(userState);
  const employees = useRecoilValue(employeesState);
  const [isSendingMoeny, setIsSendingMoney] = useState(false);
  const [balance, setBalance] = useState(0);
  const [transferAmount, setTransferAmount] = useState(0);
  const [assignee, setAssignee] = useState("");
  const [assigneeName, setAssigneeName] = useState("");
  const [searchingEmployees, setSearchingEmployees] = useState({});

  const searchUser = (user) => {
    setSearchingEmployees({});
    setAssigneeName(user);
    Object?.entries(employees)?.map(([key, value]) => {
      value?.name.includes(user) &&
        setSearchingEmployees((prevState) => {
          return { ...prevState, [key]: value };
        });
    });
    !user && setSearchingEmployees({});
  };

  useEffect(async () => {
    setBalance(await getUserBalance(currentUser.userAddress));
  }, []);

  return (
    <div
      className="shadow-medium dark:shadow-none lg:hover:shadow-medium  lg:dark:hover:shadow-none p-8 space-y-5 bg-[#fff] dark:bg-card rounded-2xl
     transition-all duration-300 "
    >
      <div className="flex items-center space-x-1">
        <h1 className="font-bold text-base-text-light dark:text-primary-text-dark">
          Wallet
        </h1>
        <LibraryIcon className="w-[16px] h-[16px] text-primary-text-light font-medium dark:text-primary-text-dark" />
      </div>
      <div className="font-medium">
        <div className="grid grid-cols-3 mt-5">
          <h1 className="col-span-1 text-base-text-light dark:text-primary-text-dark">
            Currency
          </h1>
          <p className="col-span-2 text-base-text-light dark:text-secondary-text-dark font-normal">
            GLC
          </p>
        </div>
        <div className="grid grid-cols-3 mt-5">
          <h1 className="col-span-1 text-base-text-light dark:text-primary-text-dark">
            Salary
          </h1>
          <p className="col-span-2 text-base-text-light dark:text-secondary-text-dark font-normal">
            10 GLC
          </p>
        </div>
        <div className="grid grid-cols-3 mt-5">
          <h1 className="col-span-1 text-base-text-light dark:text-primary-text-dark">
            Balance
          </h1>
          <p className="col-span-2 text-base-text-light dark:text-secondary-text-dark font-normal">
            {balance} GLC
          </p>
        </div>
        {user?.userAddress === currentUser?.userAddress && (
          <div className="grid grid-cols-3 mt-5">
            <button
              onClick={() => setIsSendingMoney(true)}
              className={`${
                !isSendingMoeny ? "inline-block" : "hidden"
              }  col-span-3 bg-bg-btn py-1 text-base-text-light dark:text-base-text-dark  text-lg font-semibold rounded-2xl animate-slide-down`}
            >
              Send Money
            </button>
            <div
              className={`${
                isSendingMoeny ? "col-span-3" : "hidden"
              } animate-slide-down space-y-2`}
            >
              <input
                onChange={(e) => searchUser(e.target.value)}
                value={assigneeName}
                type="text"
                placeholder="search user"
                className=" border-2 border-primary-text-light dark:border-secondary-text-dark bg-transparent  w-[100%] rounded-2xl outline-none
            text-primary-text-light font-semibold  placeholder:text-secondary-text-light placeholder:dark:text-secondary-text-dark
            dark:text-primary-text-dark px-2 py-1"
              />
              <div className="col-span-3">
                {Object.entries(searchingEmployees).length > 0 && (
                  <div className="space-y-2  rounded-xl p-2 animate-fade-in-out transition-all duration-300">
                    {Object.entries(searchingEmployees).map(([key, value]) => (
                      <div key={key}>
                        <div
                          className="flex items-center space-x-2 px-2 py-1 cursor-pointer hover:scale-[1.02] transition-all duration-300"
                          onClick={() => {
                            setAssignee(value);
                            setAssigneeName(value?.name);
                            setSearchingEmployees({});
                          }}
                        >
                          <div className="relative w-[32px] h-[32px] rounded-full bg-bg-danger">
                            <Image
                              src={value.avatar}
                              layout="fill"
                              className="rounded-full object-cover"
                            />
                          </div>
                          <h1 className="text-base-text-light dark:text-primary-text-dark font-medium">
                            {value.name}
                          </h1>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <input
                onChange={(e) => setTransferAmount(e.target.value)}
                value={transferAmount}
                type="text"
                placeholder="amount"
                className="border-2 border-primary-text-light dark:border-secondary-text-dark bg-transparent  w-[100%] rounded-2xl outline-none
            text-primary-text-light font-semibold  placeholder:text-secondary-text-light placeholder:dark:text-secondary-text-dark
            dark:text-primary-text-dark px-2 py-1"
              />
              <div className="grid grid-cols-2 gap-5">
                <button
                  onClick={async () => {
                    await sendAmount(assignee?.userAddress, transferAmount);
                    setBalance(await getUserBalance(currentUser.userAddress));
                    setIsSendingMoney(false);
                    setTransferAmount(0);
                    setAssignee(null);
                    setAssigneeName("");
                  }}
                  className="col-span-1 bg-bg-btn  py-1 text-base-text-light dark:text-base-text-dark  text-lg font-semibold rounded-2xl active:scale-[1.1]
            transition-all duration-200"
                >
                  Send
                </button>
                <button
                  onClick={() => setIsSendingMoney(false)}
                  className="col-span-1 bg-bg-danger  py-1 text-base-text-light dark:text-base-text-dark  text-lg font-semibold rounded-2xl active:scale-[1.1]
              transition-all duration-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletCard;
