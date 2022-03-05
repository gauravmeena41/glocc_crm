import React from "react";
import {
  FolderIcon,
  HomeIcon,
  InboxIcon,
  OfficeBuildingIcon,
  UserGroupIcon,
  UserIcon,
} from "@heroicons/react/outline";

const Sidebar = () => {
  return (
    <div className="flex items-center h-[calc(100vh-53px)]">
      <div
        className="bg-[#1B1A47] text-[#f1f1f1] w-[80px] text-center grid grid-rows-6 h-[550px]
      rounded-tr rounded-br"
      >
        <div className="sidebar-item">
          <HomeIcon className="sidebar-item-icon" />
          <h1 className="sidebar-item-text ">Home</h1>
        </div>
        <div className="sidebar-item">
          <UserIcon className="sidebar-item-icon" />
          <h1 className="sidebar-item-text ">Self-Service</h1>
        </div>
        <div className="sidebar-item">
          <UserGroupIcon className="sidebar-item-icon" />
          <h1 className="sidebar-item-text ">Employees</h1>
        </div>
        <div className="sidebar-item">
          <FolderIcon className="sidebar-item-icon" />
          <h1 className="sidebar-item-text ">Files</h1>
        </div>
        <div className="sidebar-item">
          <OfficeBuildingIcon className="sidebar-item-icon" />
          <h1 className="sidebar-item-text ">Organization</h1>
        </div>
        <div className="sidebar-item border-none">
          <InboxIcon className="sidebar-item-icon" />
          <h1 className="sidebar-item-text ">Complaints</h1>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
