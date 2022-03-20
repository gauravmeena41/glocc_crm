import Image from "next/image";
import { BeakerIcon } from "@heroicons/react/outline";

const SkillCard = ({ currentUser }) => {
  return (
    <div className="space-y-5">
      <div
        className="shadow-base dark:shadow-none lg:hover:shadow-medium dark:shadow-none lg:dark:hover:shadow-none px-5 py-5 space-y-8 font-semibold
      w-full h-full bg-[#fff] dark:bg-card rounded-[2rem] transition-all duration-300 shadow-base dark:shadow-none"
      >
        <h1 className="font-bold text-base-text-light dark:text-primary-text-dark flex items-center">
          Skills
          <BeakerIcon className="w-[16px] h-[16px] text-primary-text-light font-medium dark:text-primary-text-dark ml-1" />
        </h1>
        <div className={`grid ${currentUser.skills && "grid-cols-2"} gap-10 `}>
          {currentUser.skills ? (
            currentUser.skills.split(",").map((skill, idx) => (
              <h1
                key={idx}
                className="text-sm text-base-text-light dark:text-secondary-text-dark"
              >
                {skill}
              </h1>
            ))
          ) : (
            <div className="flex items-center justify-center w-full h-full">
              <div className="relative w-[100px] h-[100px]">
                <Image
                  src="/images/skills.svg"
                  alt=""
                  className="dark:opacity-[0.85]"
                  layout="fill"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SkillCard;
