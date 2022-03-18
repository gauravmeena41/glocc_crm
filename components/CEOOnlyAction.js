import React, { useEffect, useState } from "react";

import { useRecoilState } from "recoil";
import { userState } from "../atoms/user";
import AddDepartmentCard from "./AddDepartmentCard";
import AddUserCard from "./AddUserCard";
import AssignTask from "./AssignTask";
import ChangeUserRoleCard from "./ChangeUserRoleCard";
import ChangeUserTeamCard from "./ChangeUserTeamCard";
import RemoveUserCard from "./RemoveUserCard";
import UpdateTaskCard from "./UpdateTaskCard";

const CEOOnlyAction = ({ orgData, employees, roles }) => {
  const [user] = useRecoilState(userState);
  const [currentAction, setCurrentAction] = useState("");

  useEffect(() => {
    user && setCurrentAction("Add Department");
  }, [user]);

  return (
    <div className="shadow-base lg:hover:shadow-medium dark:shadow-none lg:dark:hover:shadow-none dark:bg-card rounded-xl">
      <div className="border-b-2 border-secondary-text-dark">
        <select
          onChange={(e) => setCurrentAction(e.target.value)}
          className="w-full outline-none border-none bg-transparent text-base-text-light dark:text-primary-text-dark p-2 font-medium
        text-lg rounded-t-xl text-center cursor-pointer"
        >
          <option className="dark:bg-[#333333]" value="Add Department">
            Add Department
          </option>
          <option className="dark:bg-[#333333]" value="Add User">
            Add User
          </option>
          <option className="dark:bg-[#333333]" value="Assign Tasks">
            Assign Tasks
          </option>
          <option className="dark:bg-[#333333]" value="Update Task">
            Update Task
          </option>
          <option className="dark:bg-[#333333]" value="Remove User">
            Remove User
          </option>
          <option className="dark:bg-[#333333]" value="Change User Team">
            Change User Team
          </option>
          <option className="dark:bg-[#333333]" value="Change User Role">
            Change User Role
          </option>
        </select>
      </div>
      {user &&
        user.role === "Chief Executive Officer" &&
        (currentAction === "Add Department" ? (
          <AddDepartmentCard />
        ) : currentAction === "Add User" ? (
          <AddUserCard orgData={orgData} roles={roles} />
        ) : currentAction === "Assign Tasks" ? (
          <AssignTask employees={employees} />
        ) : currentAction === "Update Task" ? (
          <UpdateTaskCard employees={employees} />
        ) : currentAction === "Remove User" ? (
          <RemoveUserCard employees={employees} />
        ) : currentAction === "Change User Team" ? (
          <ChangeUserTeamCard
            employees={employees}
            departments={orgData?.departments}
          />
        ) : (
          currentAction === "Change User Role" && (
            <ChangeUserRoleCard roles={roles} employees={employees} />
          )
        ))}
    </div>
  );
};

export default CEOOnlyAction;
