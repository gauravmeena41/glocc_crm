import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { ethers } from "ethers";
import { contractAddress } from "./config";
import CRM from "./artifacts/contracts/CRM.sol/CRM.json";

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

    const contract = new ethers.Contract(contractAddress, CRM.abi, signer);
    return contract;
  } catch (error) {
    console.log(error);
  }
};

export const addUser = async (
  _userAddress,
  _name,
  _email,
  _isAdmin,
  _role,
  _team
) => {
  try {
    const contract = await getContract();
    await contract.addUser(_userAddress, _name, _email, _isAdmin, _role, _team);
  } catch (error) {
    console.log(error);
  }
};

export const searchUser = async (_userId) => {
  try {
    const contract = await getContract();
    const user = await contract.searchUser(_userId);
    return user;
  } catch (error) {
    console.log(error);
  }
};
export const login = async () => {};
