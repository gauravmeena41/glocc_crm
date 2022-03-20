const PRIVATE_KEY =
  "dfb16812a6d2dd995a1969c0de2ac9600f4f680f115bcbd27608a32c95da649c";

module.exports = {
  solidity: "0.8.13",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    mumbai: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/k-LD9CXljucuvJ1wd_42lcnBq_fZJAfP",
      accounts: [PRIVATE_KEY],
    },
  },
};
