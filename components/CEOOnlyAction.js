import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../atoms/user";
import AddDepartmentCard from "./AddDepartmentCard";
import AddUserCard from "./AddUserCard";
import AssignTask from "./AssignTask";
import ChangeOrgOwner from "./ChangeOrgOwner";
import ChangeUserRoleCard from "./ChangeUserRoleCard";
import ChangeUserTeamCard from "./ChangeUserTeamCard";
import RemoveUserCard from "./RemoveUserCard";
import UpdateTaskCard from "./UpdateTaskCard";

const CEOOnlyAction = () => {
  const user = useRecoilValue(userState);
  const [currentAction, setCurrentAction] = useState("");

  useEffect(() => {
    user && setCurrentAction("Add Department");
  }, [user]);

  return (
    <div className="shadow-medium dark:shadow-none bg-[#fff] dark:bg-card rounded-[2rem] transition-all duration-300">
      <div className="border-b-2 border-gray-200">
        <select
          onChange={(e) => setCurrentAction(e.target.value)}
          className="w-full outline-none border-none bg-transparent text-base-text-light dark:text-primary-text-dark p-2 font-medium
        text-xl text-center cursor-pointer appearance-none"
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
          <option
            className="dark:bg-[#333333]"
            value="Change Organization Owner"
          >
            Change Organization Owner
          </option>
        </select>
      </div>
      {currentAction === "Add Department" ? (
        <AddDepartmentCard />
      ) : currentAction === "Add User" ? (
        <AddUserCard />
      ) : currentAction === "Assign Tasks" ? (
        <AssignTask />
      ) : currentAction === "Update Task" ? (
        <UpdateTaskCard />
      ) : currentAction === "Remove User" ? (
        <RemoveUserCard />
      ) : currentAction === "Change User Team" ? (
        <ChangeUserTeamCard />
      ) : currentAction === "Change User Role" ? (
        <ChangeUserRoleCard />
      ) : (
        currentAction === "Change Organization Owner" && <ChangeOrgOwner />
      )}
    </div>
  );
};

export default CEOOnlyAction;
