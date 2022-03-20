import Head from "next/head";
import { useEffect, useState } from "react";

import { useRecoilState } from "recoil";
import { userState } from "../atoms/user";
import Mainbar from "../components/Mainbar";
import { useRouter } from "next/router";
import { loginUser } from "../helper";

export default function Home() {
  const [user, setUser] = useRecoilState(userState);
  const router = useRouter();

  useEffect(() => {
    setUser(loginUser());
    !user && router.push("/create_org");
  }, []);

  return (
    <div className="w-full">
      <Head>
        <title>GLLOC</title>
      </Head>
      <Mainbar />
    </div>
  );
}
