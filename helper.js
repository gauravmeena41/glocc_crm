import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { ethers } from "ethers";
import { gllocAddress } from "./config";
import GLLOC from "./artifacts/contracts/GLLOC.sol/GLLOC.json";

export const getWeb3Modal = async () => {
  const web3Modal = new Web3Modal({
    network: "mainnet",
    cacheProvider: true,
    providerOptions: {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
        },
      },
    },
  });
  return web3Modal;
};

export const getContract = async () => {
  try {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    let account = await provider.listAccounts();

    return new ethers.Contract(gllocAddress, GLLOC.abi, signer);
  } catch (error) {
    console.log(error);
  }
};

export const addOrgOwner = async (
  _Owner,
  _ownerEmail,
  _ownerMobile,
  _ownerSkills
) => {
  try {
    const GLLOC = await getContract();
    const tx = await GLLOC.addOrgOwner(
      _Owner,
      _ownerEmail,
      `https://avatars.dicebear.com/api/miniavs/${_Owner}:seed.svg`,
      _ownerMobile,
      "Chief Executive Officer",
      "Management",
      _ownerSkills
    );
    await tx.wait();
  } catch (error) {
    console.log(error);
  }
};

export const addOrganization = async (
  _orgName,
  _orgWebsite,
  _orgDesc,
  _orgLogo,
  _Owner,
  _ownerEmail,
  _ownerMobile,
  _ownerSkills
) => {
  const GLLOC = await getContract();

  try {
    await GLLOC.addOrganisation(
      _orgName,
      _orgWebsite,
      _orgDesc,
      `https://avatars.dicebear.com/api/miniavs/${_orgName}:seed.svg`
    );
    await addOrgOwner(_Owner, _ownerEmail, _ownerMobile, _ownerSkills);
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async () => {
  const GLLOC = await getContract();
  try {
    const user = await GLLOC.loginUser();
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const fetchOrganization = async (_orgId) => {
  const GLLOC = await getContract();
  try {
    const org = await GLLOC.fetchOrganization(_orgId);
    return org;
  } catch (error) {
    console.log(error);
  }
};

export const addDepartment = async (_departmentName) => {
  const GLLOC = await getContract();
  try {
    await GLLOC.addDepartment(_departmentName);
  } catch (error) {
    console.log(error);
  }
};

export const addUser = async (_orgUser) => {
  const GLLOC = await getContract();
  try {
    await GLLOC.addUser(
      _orgUser.userAddress,
      _orgUser.userName,
      _orgUser.userEmail,
      `https://avatars.dicebear.com/api/miniavs/${_orgUser.userName}:seed.svg`,
      _orgUser.userRole,
      _orgUser.userTeam
    );
  } catch (error) {
    console.log(error);
  }
};

export const searchUser = async (_userAddress) => {
  const GLLOC = await getContract();
  try {
    const user = await GLLOC.searchUser(_userAddress);
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const changeUsername = async (_name) => {
  const GLLOC = await getContract();
  try {
    await GLLOC.changeUsername(_name);
  } catch (error) {
    console.log(error);
  }
};

export const changeUseremail = async (_email) => {
  const GLLOC = await getContract();
  try {
    await GLLOC.changeUseremail(_email);
  } catch (error) {
    console.log(error);
  }
};

export const changeUseravatar = async (_avatar) => {
  const GLLOC = await getContract();
  try {
    await GLLOC.changeUseravatar(_avatar);
  } catch (error) {
    console.log(error);
  }
};

export const changeUsermobile = async (_mobile) => {
  const GLLOC = await getContract();
  try {
    await GLLOC.changeUsermobile(_mobile);
  } catch (error) {
    console.log(error);
  }
};

export const changeUserskills = async (_skills) => {
  const GLLOC = await getContract();
  try {
    await GLLOC.changeUserskills(_skills);
  } catch (error) {
    console.log(error);
  }
};

export const fetchWeather = async (lat = 51.507351, long = -0.127758) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=8001b63c99119314ac41c3a46f2bd563`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const assignTask = async (
  _userAddress,
  _orgId,
  _taskName,
  _taskDescription
) => {
  const GLLOC = await getContract();

  try {
    await GLLOC.assignTask(_userAddress, _taskName, _taskDescription);
  } catch (error) {
    console.log(error);
  }
};

export const searchTask = async (_taskId) => {
  const GLLOC = await getContract();
  try {
    const task = await GLLOC.searchTask(_taskId);
    return task;
  } catch (error) {
    console.log(error);
  }
};

export const updateTask = async (_taskId) => {
  const GLLOC = await getContract();
  try {
    await GLLOC.comleteTask(_taskId);
  } catch (error) {
    console.log(error);
  }
};

export const checkIn = async () => {
  const GLLOC = await getContract();
  try {
    await GLLOC.checkIn();
  } catch (error) {
    console.log(error);
  }
};
export const checkOut = async () => {
  const GLLOC = await getContract();
  try {
    await GLLOC.checkOut();
  } catch (error) {
    console.log(error);
  }
};
