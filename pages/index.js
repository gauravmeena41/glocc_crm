import Head from "next/head";
import { useSelector } from "react-redux";
import Mainbar from "../components/Mainbar";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function Home() {
  const user = useSelector((state) => state.user);

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
