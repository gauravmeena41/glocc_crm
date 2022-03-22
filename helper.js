import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { ethers } from "ethers";
import { gllocAddress, gllocToken } from "./config";
// import GLLOC from "./artifacts/contracts/GLLOC.sol/GLLOC.json";
// import GLLOCTOKEN from "./artifacts/contracts/GLLOCTOKEN.sol/GLLOCTOKEN.json";

import GLLOC from "./utils/GLLOC.json";
import GLLOCTOKEN from "./utils/GLLOCTOKEN.json";

import { storage } from "./firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Holidays from "date-holidays";

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

export const getGllocContract = async () => {
  try {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    return new ethers.Contract(gllocAddress, GLLOC.abi, signer);
  } catch (error) {
    console.log(error);
  }
};
export const getGllocTokenContract = async () => {
  try {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    return new ethers.Contract(gllocToken, GLLOCTOKEN.abi, signer);
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
    const GLLOC = await getGllocContract();
    const tx = await GLLOC.addOrgOwner(
      _Owner,
      _ownerEmail,
      `https://avatars.dicebear.com/api/miniavs/${_Owner}:seed.svg`,
      _ownerMobile,
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
  const GLLOC = await getGllocContract();

  try {
    const tx = await GLLOC.addOrganisation(
      _orgName,
      _orgWebsite,
      _orgDesc,
      `https://avatars.dicebear.com/api/miniavs/${_orgName}:seed.svg`,
      _Owner,
      _ownerEmail,
      `https://avatars.dicebear.com/api/miniavs/${_Owner}:seed.svg`,
      _ownerMobile,
      _ownerSkills
    );
    await tx.wait();
    const GLLOCTOKEN = await getGllocTokenContract();
    await GLLOCTOKEN.issueToken(1000000000000000);
  } catch (error) {
    console.log(error);
  }
};

export const changeOrgOwner = async (_newOrgOwner) => {
  const GLLOC = await getGllocContract();
  try {
    await GLLOC.changeOrgOwner(_newOrgOwner);
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async () => {
  const GLLOC = await getGllocContract();
  try {
    const user = await GLLOC.loginUser();
    if (user.userAddress === "0x0000000000000000000000000000000000000000")
      throw new Error("User not found");
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const fetchOrganization = async (_orgId) => {
  const GLLOC = await getGllocContract();
  try {
    const org = await GLLOC.fetchOrganization(_orgId);
    return org;
  } catch (error) {
    console.log(error);
  }
};

export const addDepartment = async (_departmentName) => {
  const GLLOC = await getGllocContract();
  try {
    await GLLOC.addDepartment(_departmentName);
  } catch (error) {
    console.log(error);
  }
};

export const userRoles = () => {
  const roles = [
    "HR Manager",
    "Training Manager",
    "Chief Technical Officer",
    " Business Development Manager",
    "Technical Lead",
    "Human Resources Manager",
    "Trainee",
    "Intern",
    "Front-end Developer",
    "Back-end Developer",
    "Full-stack Developer",
    "Web Developer",
    "Blockchain Developer",
    "Quality Assurance",
    "Data Admin",
    "IT Support",
    "Network Manager",
  ];
  return roles;
};

export const addUser = async (_orgUser) => {
  const GLLOC = await getGllocContract();
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

export const removeUser = async (_userAddress) => {
  const GLLOC = await getGllocContract();
  console.log(_userAddress);
  try {
    await GLLOC.removeUser(_userAddress);
  } catch (error) {
    console.log(error);
  }
};

export const searchUser = async (_userAddress) => {
  const GLLOC = await getGllocContract();
  try {
    const user = await GLLOC.searchUser(_userAddress);
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (
  _userName = "",
  _userEmail = "",
  _userMobile = "",
  _userSkills = "",
  _avatar = "",
  userMaritalStatus = "",
  _userDob = 0
) => {
  const GLLOC = await getGllocContract();
  try {
    let imageUrl;
    const imageRef = ref(storage, `profile/${_avatar.name}`);
    await uploadBytesResumable(imageRef, _avatar).then(async (snapshot) => {
      imageUrl = await getDownloadURL(snapshot.ref);
    });
    await GLLOC.updateUser(
      _userName,
      _userEmail,
      _userMobile,
      imageUrl,
      _userSkills,
      userMaritalStatus,
      _userDob
    );
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
  const GLLOC = await getGllocContract();

  try {
    await GLLOC.assignTask(_userAddress, _taskName, _taskDescription);
  } catch (error) {
    console.log(error);
  }
};

export const searchTask = async (_taskId) => {
  const GLLOC = await getGllocContract();
  try {
    const task = await GLLOC.searchTask(_taskId);
    return task;
  } catch (error) {
    console.log(error);
  }
};

export const updateTask = async (_taskId) => {
  const GLLOC = await getGllocContract();
  try {
    await GLLOC.comleteTask(_taskId);
  } catch (error) {
    console.log(error);
  }
};

export const checkIn = async () => {
  const GLLOC = await getGllocContract();
  try {
    await GLLOC.checkIn();
  } catch (error) {
    console.log(error);
  }
};
export const checkOut = async () => {
  const GLLOC = await getGllocContract();
  try {
    await GLLOC.checkOut();
  } catch (error) {
    console.log(error);
  }
};

export const getAllUser = async (orgUsers, ceo = "") => {
  try {
    const users = [];

    ceo && users.push(await searchUser(ceo));

    for (let i = 0; i < orgUsers.length; i++) {
      let user = await searchUser(orgUsers[i]);
      users.push(user);
    }
    return users;
  } catch (error) {
    console.log(error);
  }
};

export const changeUserteam = async (_userAddress, _teamName) => {
  const GLLOC = await getGllocContract();
  try {
    await GLLOC.changeUserteam(_userAddress, _teamName);
  } catch (error) {
    console.log(error);
  }
};

export const changeUserrole = async (_userAddress, _teamName) => {
  const GLLOC = await getGllocContract();
  try {
    await GLLOC.changeUserrole(_userAddress, _teamName);
  } catch (error) {
    console.log(error);
  }
};

export const getUserBalance = async (_userAddress) => {
  const GLLOCTOKEN = await getGllocTokenContract();

  try {
    const balance = await GLLOCTOKEN.balanceOf(_userAddress);
    return ethers.utils.formatEther(balance);
  } catch (error) {
    console.log(error);
  }
};

export const sendAmount = async (_userAddress, _amount) => {
  const GLLOCTOKEN = await getGllocTokenContract();
  try {
    await GLLOCTOKEN.transfer(_userAddress, ethers.utils.parseEther(_amount));
  } catch (error) {
    console.log(error);
  }
};

export const fetchHolidays = (_year) => {
  try {
    const hd = new Holidays("US", "la", "no");

    return hd.getHolidays(_year);
  } catch (error) {
    console.log(error);
  }
};
