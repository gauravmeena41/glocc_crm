import "../styles/globals.css";
import { RecoilRoot } from "recoil";
import ProgressBar from "@badrap/bar-of-progress";
import Router from "next/router";
import SideNavbar from "../components/SideNavbar";
import { MenuAlt1Icon } from "@heroicons/react/outline";
import { useState } from "react";

const progress = new ProgressBar({
  size: 2,
  color: "#2cb67d",
  className: "z-10",
  delay: 0,
});

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

const MyApp = ({ Component, pageProps }) => {
  const [isSidebarShow, setIsSidebarShow] = useState(false);

  return (
    <div className="flex relative">
      <RecoilRoot>
        <MenuAlt1Icon
          className="absolute w-[32px] h-[32px] z-[3] cursor-pointer dark:text-[#fff]"
          onClick={() => setIsSidebarShow(!isSidebarShow)}
        />
        <div
          className={`${
            isSidebarShow ? "inline-block" : "hidden"
          } absolute animate-slide-right z-[2]`}
        >
          <SideNavbar setIsSidebarShow={setIsSidebarShow} />
        </div>
        <Component {...pageProps} />
      </RecoilRoot>
    </div>
  );
};

export default MyApp;
