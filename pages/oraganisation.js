import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AddDepartmentCard from "../components/AddDepartmentCard";
import AddUserCard from "../components/AddUserCard";
import AssignTask from "../components/AssignTask";
import DepartmentCard from "../components/DepartmentCard";
import UpdateTaskCard from "../components/UpdateTaskCard";
import { fetchOrganization, searchUser } from "../helper";

const oraganisation = () => {
  const user = useSelector((state) => state.user);
  const [employees, setEmployees] = useState({});

  const [orgData, setOrgData] = useState([]);

  useEffect(async () => {
    user && setOrgData(await fetchOrganization(user.orgId));
  }, [user]);

  useEffect(async () => {
    let temp = await searchUser(orgData?.orgId);

    setEmployees((prevState) => {
      return { ...prevState, [user]: temp };
    });

    orgData?.users?.map(async (user) => {
      let data = await searchUser(user);
      setEmployees((prevState) => {
        return { ...prevState, [user]: data };
      });
    });
  }, [orgData]);

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 m-5 gap-5 ">
      {orgData.departments?.map((department, idx) => (
        <DepartmentCard key={idx} users={employees} department={department} />
      ))}
      {user && user.role === "Chief Executive Officer" && <AddDepartmentCard />}
      {user && user.role === "Chief Executive Officer" && (
        <AddUserCard orgData={orgData} />
      )}
      {user && user.role === "Chief Executive Officer" && (
        <AssignTask employees={employees} />
      )}
      {user && user.role === "Chief Executive Officer" && (
        <UpdateTaskCard employees={employees} />
      )}
    </div>
  );
};

export default oraganisation;
