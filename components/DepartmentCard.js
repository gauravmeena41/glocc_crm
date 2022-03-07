import Image from "next/image";
import Link from "next/link";

const DepartmentCard = ({ data, dummyData }) => {
  return (
    <div className="shadow-equal-shadow dark:bg-card">
      <h1 className="border-b border-gray-400 p-2 text-center text-lg font-medium text-gray-700 dark:text-primary-text rounded-sm">
        {data}
      </h1>
      <div className=" my-5 py-2 space-y-3 overflow-scroll h-[350px]">
        {dummyData.map((data, idx) => (
          <Link href="/profile" key={idx}>
            <div
              className="shadow-equal-shadow  p-1 rounded-full flex items-center space-x-4
          cursor-pointer transition-all duration-300 mx-5 hover:m-3 dark:bg-[#333333]"
            >
              <div className="relative w-[42px] h-[42px]">
                <Image
                  src="https://images.unsplash.com/photo-1646528235600-303a0ad3528a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                  layout="fill"
                  className="rounded-full object-cover"
                />
              </div>
              <div>
                <h1 className="dark:text-primary-text">{data.name}</h1>
                <h1 className="text-xs text-gray-400 dark:text-secondary-text">
                  {data.position}
                </h1>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DepartmentCard;
