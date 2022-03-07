import DepartmentCard from "../components/DepartmentCard";

const oraganisation = () => {
  const departments = [
    "Management",
    "Finance",
    "Marketing",
    "HR",
    "Engineering",
  ];
  const dummyData = [
    { name: "Gaurav Meena", position: "Chief Executive Officer" },
    { name: "Guru Meena", position: "Chief Technical Officer" },
    { name: "Guru", position: "HR Manager" },
    { name: "Shubham Sharma", position: "Traning Manager" },
    { name: "Rohit Meena", position: "Business Development Manager" },
  ];
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 m-5 gap-5">
      {departments.map((data, idx) => (
        <DepartmentCard key={idx} data={data} dummyData={dummyData} />
      ))}
    </div>
  );
};

export default oraganisation;
