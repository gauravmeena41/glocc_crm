import React from "react";
import UpdateEmailCard from "../../components/UpdateEmailCard";
import UpdateMaritalStatusCard from "../../components/UpdateMaritalStatusCard";
import UpdateMobileCard from "../../components/UpdateMobileCard";
import UpdateNameCard from "../../components/UpdateNameCard";
import UpdateSkillsCard from "../../components/UpdateSkillsCard";

const edit_user = () => {
  return (
    <div className="grid grid-cols-4 gap-5 m-5">
      <UpdateNameCard />
      <UpdateEmailCard />
      <UpdateMobileCard />
      <UpdateSkillsCard />
      <UpdateMaritalStatusCard />
    </div>
  );
};

export default edit_user;
