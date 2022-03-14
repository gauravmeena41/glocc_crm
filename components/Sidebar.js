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

const Sidebar = ({ isSidebarShow, setIsSidebarShow }) => {
  const user = useSelector((state) => state.user);
  return (
    <div className="flex items-center w-full">
      <div className="bg-[#fffffe] dark:bg-card h-[100px] w-[100vw] grid grid-cols-5 rounded-b-xl">
        <Link href={`/profile/${user.userAddress}`}>
          <div
            className="sidebar-item"
            onClick={() => setIsSidebarShow(!isSidebarShow)}
          >
            <UserIcon className="sidebar-item-icon" />
            <h1 className="sidebar-item-text ">Self-Service</h1>
          </div>
        </Link>
        <Link href="/employees">
          <div
            className="sidebar-item"
            onClick={() => setIsSidebarShow(!isSidebarShow)}
          >
            <UserGroupIcon className="sidebar-item-icon" />
            <h1 className="sidebar-item-text ">Employees</h1>
          </div>
        </Link>
        <div className="sidebar-item">
          <FolderIcon className="sidebar-item-icon" />
          <h1 className="sidebar-item-text ">Files</h1>
        </div>
        <Link href="oraganisation">
          <div
            className="sidebar-item"
            onClick={() => setIsSidebarShow(!isSidebarShow)}
          >
            <OfficeBuildingIcon className="sidebar-item-icon" />
            <h1 className="sidebar-item-text ">Organization</h1>
          </div>
        </Link>
        <div
          className="sidebar-item border-none"
          onClick={() => setIsSidebarShow(!isSidebarShow)}
        >
          <InboxIcon className="sidebar-item-icon" />
          <h1 className="sidebar-item-text ">Complaints</h1>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
