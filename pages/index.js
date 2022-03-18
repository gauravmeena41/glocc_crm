import Head from "next/head";
import { useEffect, useState } from "react";

import { useRecoilState } from "recoil";
import { userState } from "../atoms/user";
import Mainbar from "../components/Mainbar";
import { useRouter } from "next/router";

export default function Home() {
  const [user, setUser] = useRecoilState(userState);
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
        <div>
          <div>
            <Mainbar />
          </div>
        </div>
      )}
    </div>
  );
}
