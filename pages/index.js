import Head from "next/head";
import { useSelector } from "react-redux";
import CreateOrg from "../components/CreateOrg";
import Mainbar from "../components/Mainbar";
import Sidebar from "../components/Sidebar";

export default function Home() {
  const user = useSelector((state) => state.user);

  if (!user) {
    return <CreateOrg />;
  }

  return (
    <div>
      <Head>
        <title>GLLOC</title>
      </Head>
      <div className="flex">
        <div className="hidden md:inline-flex">
          <Sidebar />
        </div>
        <Mainbar />
      </div>
    </div>
  );
}
