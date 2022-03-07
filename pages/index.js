import Head from "next/head";
import { useSelector } from "react-redux";
import Mainbar from "../components/Mainbar";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function Home() {
  const user = useSelector((state) => state.user);

  if (!user)
    return (
      <div className="flex items-center justify-center h-[calc(100vh-53px)]">
        <h1 className="text-2xl dark:text-primary-text ">
          You are not a part of this. Please contact your administrator
        </h1>
      </div>
    );

  return (
    <div>
      <Head>
        <title>GLLOC</title>
      </Head>
      <div className="flex">
        <Sidebar />
        <Mainbar />
      </div>
    </div>
  );
}
