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
    <div className="dark:bg-[#18191a]">
      <Provider store={store}>
        <Navbar />
        {!store.getState().user ? (
          <div className="flex items-center justify-center h-[calc(100vh-53px)] transition-all duration-1000">
            <div
              className={`shadow-equal-shadow md:w-[700px] dark:bg-card relative ${
                !isCreateOrg ? "hidden" : ""
              }`}
            >
              <XCircleIcon
                className="absolute top-1 left-1 w-6 h-6 dark:text-secondary-text cursor-pointer"
                onClick={() => setIsCreateOrg(false)}
              />
              <h1 className="border-b border-gray-500 p-2 text-center font-medium text-lg dark:text-primary-text">
                Create Organization
              </h1>
              <div className="grid lg:grid-cols-2">
                <div className="flex flex-col items-center m-5 space-y-5">
                  <h1
                    className="shadow-equal-shadow w-full text-center
                  font-medium p-1 dark:text-primary-text dark:bg-gray-700"
                  >
                    Org info
                  </h1>
                  <input
                    required
                    className="border-2 bg-transparent border-gray-500 text-primary-text w-[100%] rounded-full outline-none placeholder:text-gray-400 px-2 py-1"
                    type="text"
                    placeholder="enter your organization name.."
                    onChange={(e) => setOrgName(e.target.value)}
                  />
                  <input
                    required
                    className="border-2 bg-transparent border-gray-500 text-primary-text w-[100%] rounded-full outline-none placeholder:text-gray-400 px-2 py-1"
                    type="text"
                    placeholder="enter your organization website"
                    onChange={(e) => setOrgWebsite(e.target.value)}
                  />
                  <input
                    required
                    className="border-2 bg-transparent border-gray-500 text-primary-text w-[100%] rounded-full outline-none placeholder:text-gray-400 px-2 py-1"
                    type="text"
                    placeholder="enter your organization tagline..."
                    onChange={(e) => setOrgDesc(e.target.value)}
                  />
                  <label
                    htmlFor="orgLogo"
                    className="flex items-center justify-center rounded-full font-medium shadow-equal-shadow p-2 w-[100%]
                    dark:bg-gray-700 dark:text-primary-text"
                  >
                    Choose your logo
                    <PlusCircleIcon className="w-[20px] h-[20px] text-gray-500 ml-1 dark:text-secondary-text" />
                  </label>
                  <input
                    required
                    type="file"
                    id="orgLogo"
                    className="hidden"
                    onChange={(e) => setOrgLogo(e.target.files[0])}
                  />
                </div>
                <div className="flex flex-col items-center space-y-5 m-5">
                  <h1
                    className="shadow-equal-shadow w-full text-center font-medium p-1
                  dark:text-primary-text dark:bg-gray-700"
                  >
                    CEO Info
                  </h1>
                  <input
                    required
                    placeholder="name"
                    className="border-2 bg-transparent border-gray-500 text-primary-text w-[100%] rounded-full outline-none placeholder:text-gray-400 px-2 py-1"
                    type="text"
                    onChange={(e) => setOwner(e.target.value)}
                  />
                  <input
                    required
                    placeholder="email"
                    className="border-2 bg-transparent border-gray-500 text-primary-text w-[100%] rounded-full outline-none placeholder:text-gray-400 px-2 py-1"
                    type="text"
                    onChange={(e) => setOwnerEmail(e.target.value)}
                  />
                  <input
                    required
                    placeholder="mobile"
                    className="border-2 bg-transparent border-gray-500 text-primary-text w-[100%] rounded-full outline-none placeholder:text-gray-400 px-2 py-1"
                    type="text"
                    onChange={(e) => setOwnerMobile(e.target.value)}
                  />
                  <input
                    required
                    placeholder="skills"
                    className="border-2 bg-transparent border-gray-500 text-primary-text w-[100%] rounded-full outline-none placeholder:text-gray-400 px-2 py-1"
                    type="text"
                    onChange={(e) => setOwnerSkills(e.target.value)}
                  />
                </div>
              </div>
              <button
                className="bg-green-400 p-2 w-full text-lg text-white font-medium"
                onClick={async () =>
                  await addOrganization(
                    orgName,
                    orgWebsite,
                    orgDesc,
                    orgLogo,
                    Owner,
                    ownerEmail,
                    ownerMobile,
                    ownerSkills
                  )
                }
              >
                Create Organization
              </button>
            </div>
            <button
              className="shadow-equal-shadow px-2 py-1 w-[200px] rounded-sm font-medium
              dark:bg-card dark:text-primary-text"
              onClick={() => setIsCreateOrg(true)}
            >
              Create Organization
            </button>
          </div>
        ) : (
          <Component {...pageProps} />
        )}
      </Provider>
    </div>
  );
};

export default MyApp;
