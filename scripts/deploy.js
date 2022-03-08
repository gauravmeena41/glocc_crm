const hre = require("hardhat");
const fs = require("fs");

const main = async () => {
  const CRM = await hre.ethers.getContractFactory("CRM");
  const crm = await CRM.deploy();
  await crm.deployed();
  console.log("GLLOC deployed: ", crm.address);

  fs.writeFileSync(
    "./config.js",
    `
    export const gllocAddress = "${crm.address}";
    export const ownerAddress = "${crm.signer.address}"
    `
  );
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
