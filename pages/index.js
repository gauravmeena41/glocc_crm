import Head from "next/head";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../atoms/user";
import Mainbar from "../components/Mainbar";
import { loginUser } from "../helper";

export default function Home() {
  const [user, setUser] = useRecoilState(userState);
  useEffect(async () => {
    setUser(await loginUser());
  }, []);

  return (
    <div className="w-full">
      <Head>
        <title>GLLOC || Home</title>
      </Head>
      <Mainbar />
    </div>
  );
}
