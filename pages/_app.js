import Navbar from "../components/Navbar";
import "../styles/globals.css";
import { RecoilRoot } from "recoil";

const MyApp = ({ Component, pageProps }) => {
  return (
    <div>
      <RecoilRoot>
        <Navbar />
        <Component {...pageProps} />
      </RecoilRoot>
    </div>
  );
};

export default MyApp;
