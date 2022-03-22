import { useState } from "react";
import { changeOrgOwner } from "../helper";

const ChangeOrgOwner = () => {
  const [newOrgOwner, setNewOrgOwner] = useState("");
  return (
    <div className="flex flex-col m-5 py-2 space-y-3 overflow-scroll h-[350px]">
      <div>
        <input
          onChange={(e) => setNewOrgOwner(e.target.value)}
          value={newOrgOwner}
          type="text"
          placeholder="new owner eth address..."
          className="border-2 border-primary-text-light dark:border-secondary-text-dark bg-transparent w-[100%] rounded-xl outline-none
            text-primary-text-dark-light font-semibold  placeholder:text-secondary-text-light placeholder:dark:text-secondary-text-dark dark:text-primary-text-dark px-2 py-1"
        />
      </div>

      <button
        onClick={() => changeOrgOwner(newOrgOwner)}
        className="bg-bg-btn p-1 rounded-xl w-full text-lg text-secondary-text-light  dark:text-base-text-dark font-medium"
      >
        Change Owner
      </button>
    </div>
  );
};

export default ChangeOrgOwner;
