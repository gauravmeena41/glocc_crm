import { MenuIcon } from "@heroicons/react/outline";
import Head from "next/head";
import { useState } from "react";
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
        <div>
          <Mainbar />
        </div>
      </div>
    </div>
  );
}
