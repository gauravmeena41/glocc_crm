import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DepartmentCard from "../components/DepartmentCard";
import { addDepartment, addUser, fetchOrganization } from "../helper";

const oraganisation = () => {
  const user = useSelector((state) => state.user);

  const [orgData, setOrgData] = useState([]);
  const [orgUser, setOrgUser] = useState({
    userAddress: "",
    userName: "",
    userEmail: "",
    userRole: "",
    userTeam: "",
  });

  const [department, setDepartment] = useState("");

  useEffect(async () => {
    user && setOrgData(await fetchOrganization(user.orgId));
  }, [user]);

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 m-5 gap-5 ">
      {orgData.departments?.map((department, idx) => (
        <DepartmentCard
          key={idx}
          users={orgData.users}
          department={department}
        />
      ))}
      {user && user.role === "Chief Executive Officer" && (
        <div className="shadow-equal-shadow dark:bg-card">
          <h1 className="border-b border-gray-400 p-2 text-center text-lg font-medium text-gray-700 dark:text-primary-text rounded-sm">
            Add Department
          </h1>
          <div className="flex flex-col m-5 py-2 space-y-3 overflow-scroll h-[350px]">
            <input
              onChange={(e) => setDepartment(e.target.value)}
              type="text"
              placeholder="department name..."
              className="border-2 bg-transparent px-2 py-1 text-gray-500
            dark:text-secondary-text rounded-full outline-none"
            />
            <button
              onClick={() => addDepartment(department)}
              className="bg-green-400 p-1 rounded-sm w-full text-lg text-white font-medium"
            >
              Create Department
            </button>
          </div>
        </div>
      )}
      {user && user.role === "Chief Executive Officer" && (
        <div className="shadow-equal-shadow dark:bg-card">
          <h1 className="border-b border-gray-400 p-2 text-center text-lg font-medium text-gray-700 dark:text-primary-text rounded-sm">
            Add User
          </h1>
          <div className="flex flex-col m-5 py-2 space-y-3 overflow-scroll h-[350px]">
            <input
              onChange={(e) =>
                setOrgUser({ ...orgUser, userAddress: e.target.value })
              }
              type="text"
              placeholder="user address"
              className="border-2 bg-transparent px-2 py-1 text-gray-500
            dark:text-secondary-text rounded-full outline-none"
            />
            <input
              onChange={(e) =>
                setOrgUser({ ...orgUser, userName: e.target.value })
              }
              type="text"
              placeholder="user name"
              className="border-2 bg-transparent px-2 py-1 text-gray-500
            dark:text-secondary-text rounded-full outline-none"
            />
            <input
              onChange={(e) =>
                setOrgUser({ ...orgUser, userEmail: e.target.value })
              }
              type="text"
              placeholder="user email"
              className="border-2 bg-transparent px-2 py-1 text-gray-500
            dark:text-secondary-text rounded-full outline-none"
            />
            <select
              className="outline-none dark:bg-[#333333] rounded-lg dark:text-primary-text p-1"
              defaultValue=""
              onChange={(e) =>
                setOrgUser({ ...orgUser, userRole: e.target.value })
              }
            >
              <option disabled value="">
                Select Role
              </option>
              <option value="HR Manager">HR Manager</option>
              <option value="Training Manager">Training Manager</option>
              <option value="Chief Technical Office">
                Chief Technical Office
              </option>
              <option value="Business Development Manager">
                Business Development Manager
              </option>
              <option value="Developer">Developer</option>
            </select>
            <select
              className="outline-none dark:bg-[#333333] rounded-lg dark:text-primary-text p-1"
              defaultValue=""
              onChange={(e) =>
                setOrgUser({ ...orgUser, userTeam: e.target.value })
              }
            >
              <option disabled value="">
                Select Department
              </option>
              {orgData.departments?.map((department, idx) => (
                <option key={idx} value={department}>
                  {department}
                </option>
              ))}
            </select>
            <button
              onClick={() =>
                orgUser.userAddress &&
                orgUser.userName &&
                orgUser.userEmail &&
                orgUser.userRole &&
                orgUser.userTeam &&
                addUser(orgUser)
              }
              className="bg-green-400 p-1 rounded-sm w-full text-lg text-white font-medium"
            >
              Create User
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default oraganisation;
