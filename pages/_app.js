import Navbar from "../components/Navbar";
import "../styles/globals.css";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { PlusCircleIcon } from "@heroicons/react/solid";
import { useState } from "react";
import { XCircleIcon } from "@heroicons/react/outline";
import { addOrganization } from "../helper";

const MyApp = ({ Component, pageProps }) => {
  const [isCreateOrg, setIsCreateOrg] = useState(false);
  const [orgName, setOrgName] = useState("");
  const [orgWebsite, setOrgWebsite] = useState("");
  const [orgDesc, setOrgDesc] = useState("");
  const [orgLogo, setOrgLogo] = useState("");
  const [Owner, setOwner] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [ownerMobile, setOwnerMobile] = useState("");
  const [ownerSkills, setOwnerSkills] = useState("");

  return (
    <div>
      <Provider store={store}>
        <Navbar />
        <Component {...pageProps} />
      </Provider>
    </div>
  );
};

export default MyApp;
