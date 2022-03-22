const hre = require("hardhat");
const fs = require("fs");

const main = async () => {
  const GLLOC = await hre.ethers.getContractFactory("GLLOC");
  const glloc = await GLLOC.deploy();
  await glloc.deployed();

  const GLLOCTOKEN = await ethers.getContractFactory("GLLOCTOKEN");
  const glloctoken = await GLLOCTOKEN.deploy();
  await glloctoken.deployed();

  fs.writeFileSync(
    "./config.js",
    `export const gllocAddress = "${glloc.address}";
    export const gllocToken = "${glloctoken.address}";`
  );
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
