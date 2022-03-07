import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { ethers } from "ethers";
import { gllocAddress } from "./config";
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
    let account = await provider.listAccounts();

    const contract = new ethers.Contract(gllocAddress, CRM.abi, signer);
    return { contract, account };
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

export const searchUser = async () => {
  try {
    const contract = await getContract();

    let user = await contract.contract.CEO();

    if (user.userAddress === contract.account[0]) {
      console.log(user);
      return user;
    } else {
      user = await contract.contract.searchUser(contract.account[0]);
      return user;
    }
  } catch (error) {
    console.log(error);
  }
};
