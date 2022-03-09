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
      `https://avatars.dicebear.com/api/adventurer-neutral/${_Owner}:seed.svg`,
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
      `https://avatars.dicebear.com/api/adventurer-neutral/${_orgName}:seed.svg`
    );
    addOrgOwner(_Owner, _ownerEmail, _ownerMobile, _ownerSkills);
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async () => {
  const GLLOC = await getContract();
  try {
    const user = await GLLOC.loginUser();
    console.log(user);
    return user;
  } catch (error) {
    console.log(error);
  }
};
