const hre = require("hardhat");
const fs = require("fs");

const main = async () => {
  const CRM = await hre.ethers.getContractFactory("CRM");
  const crm = await CRM.deploy(
    "Guru",
    "gurumeena41.gm@gmail.com",
    8769973256,
    "guru.png"
  );
  await crm.deployed();
  console.log("Social deployed: ", crm.address);

  fs.writeFileSync(
    "./config.js",
    `
    export const contractAddress = "${crm.address}";
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
