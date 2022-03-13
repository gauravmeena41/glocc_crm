import React from "react";

const SkillCard = ({ currentUser }) => {
  return (
    <div className="space-y-5">
      <div className="shadow-base lg:hover:shadow-medium dark:shadow-none dark:hover:shadow-none lg:px-5 py-5 space-y-8 font-semibold w-full h-full rounded-xl dark:bg-card transition-all duration-300">
        <h1 className="font-bold text-base-text-light dark:text-primary-text-dark">
          Skill Set
        </h1>
        <div
          className={`grid ${
            currentUser.skills && "md:grid-cols-2"
          } gap-10 m-12`}
        >
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
              <img
                src="../images/skills.svg"
                alt=""
                className="w-[100%] max-w-[200px] dark:opacity-[0.85]"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SkillCard;
