import Link from "next/link";
import {
  FolderIcon,
  HomeIcon,
  InboxIcon,
  OfficeBuildingIcon,
  UserGroupIcon,
  UserIcon,
} from "@heroicons/react/outline";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const user = useSelector((state) => state.user);
  return (
    <div className="flex items-center h-[calc(100vh-53px)]">
      <div
        className="bg-[#8471ec] dark:bg-[#160d57] text-[#f1f1f1] w-[90px] text-center grid grid-rows-5 h-[550px]
      rounded-tr rounded-br"
      >
        <Link href={`/profile/${user.userAddress}`}>
          <div className="sidebar-item">
            <UserIcon className="sidebar-item-icon" />
            <h1 className="sidebar-item-text ">Self-Service</h1>
          </div>
        </Link>
        <Link href="/employees">
          <div className="sidebar-item">
            <UserGroupIcon className="sidebar-item-icon" />
            <h1 className="sidebar-item-text ">Employees</h1>
          </div>
        </Link>
        <div className="sidebar-item">
          <FolderIcon className="sidebar-item-icon" />
          <h1 className="sidebar-item-text ">Files</h1>
        </div>
        <Link href="oraganisation">
          <div className="sidebar-item">
            <OfficeBuildingIcon className="sidebar-item-icon" />
            <h1 className="sidebar-item-text ">Organization</h1>
          </div>
        </Link>
        <div className="sidebar-item border-none">
          <InboxIcon className="sidebar-item-icon" />
          <h1 className="sidebar-item-text ">Complaints</h1>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
