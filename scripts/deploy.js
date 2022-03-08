const hre = require("hardhat");
const fs = require("fs");

const main = async () => {
  const GLLOC = await hre.ethers.getContractFactory("GLLOC");
  const glloc = await GLLOC.deploy();
  await glloc.deployed();
  console.log("GLLOC deployed: ", glloc.address);

  fs.writeFileSync(
    "./config.js",
    `
    export const gllocAddress = "${glloc.address}";
    export const ownerAddress = "${glloc.signer.address}"
    `
  );
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
