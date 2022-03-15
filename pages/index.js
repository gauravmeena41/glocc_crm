import Head from "next/head";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Mainbar from "../components/Mainbar";
import { useRouter } from "next/router";

export default function Home() {
  const user = useSelector((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    !user && router.push("/create_org");
  });

  return (
    <div>
      <Head>
        <title>GLLOC</title>
      </Head>
      {user && (
        <div className="flex">
          <div>
            <Mainbar />
          </div>
        </div>
      )}
    </div>
  );
}
