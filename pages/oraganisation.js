import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AddDepartmentCard from "../components/AddDepartmentCard";
import AddUserCard from "../components/AddUserCard";
import AssignTask from "../components/AssignTask";
import CEOOnlyAction from "../components/CEOOnlyAction";
import DepartmentCard from "../components/DepartmentCard";
import RemoveUserCard from "../components/RemoveUserCard";
import UpdateTaskCard from "../components/UpdateTaskCard";
import {
  fetchOrganization,
  getAllUser,
  searchUser,
  userRoles,
} from "../helper";

const oraganisation = () => {
  const user = useSelector((state) => state.user);
  const [employees, setEmployees] = useState([]);
  const [roles, setRoles] = useState([]);
  const router = useRouter();
  const [orgData, setOrgData] = useState([]);

  useEffect(async () => {
    !user && router.push("/");
    user && setOrgData(await fetchOrganization(user.orgId));
  }, []);

  useEffect(async () => {
    setRoles(userRoles());

    let orgId = await fetchOrganization(user?.orgId);
    let users = orgId?.users;
    let ceo = orgData?.orgId;
    setEmployees(await getAllUser(users, ceo));
  }, [orgData]);

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 m-5 gap-10 ">
      <DepartmentCard users={employees} departments={orgData?.departments} />
      <CEOOnlyAction orgData={orgData} employees={employees} roles={roles} />
    </div>
  );
};

export default oraganisation;
