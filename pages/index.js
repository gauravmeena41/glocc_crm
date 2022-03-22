import Head from "next/head";
import Mainbar from "../components/Mainbar";

export default function Home() {
  return (
    <div className="w-full">
      <Head>
        <title>GLLOC || Home</title>
      </Head>
      <Mainbar />
    </div>
  );
}
