const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("GLLOC", function () {
  it("Should create the GLLOC", async function () {
    const GLLOC = await ethers.getContractFactory("GLLOC");
    const glloc = await GLLOC.deploy();
    await glloc.deployed();

    console.log("GLLOC deployed to: ", glloc.address);

    // console.log(await glloc.owner());

    await glloc.addOrganisation(
      "GLLOC",
      "www.website.com",
      "description",
      "logo"
    );

    await glloc.addOrgOwner(
      "Gaurav Meena",
      "gurumeena41.gm@gmail.com",
      "avatar",
      "8769973256",
      "CEO",
      "Management",
      "Web Development,UI/UX design"
    );

    await glloc.addUser(
      "0xFa3103DEFDAA1203b0706525922a558c2d9cc94c",
      "Gaurav",
      "gurumeena@gmail.com",
      "avatar",
      "Developer",
      "Engineering"
    );
    await glloc.addUser(
      "0xbdA7F16Dc9c4bCa32D70Ad3f29804F2BE57A78B7",
      "Gaurav",
      "gurumeena@gmail.com",
      "avatar",
      "Developer",
      "Engineering"
    );

    let user = await glloc.removeUser("0xbdA7F16Dc9c4bCa32D70Ad3f29804F2BE57A78B7");

    // console.log(user.toNumber());

    let orgData = await glloc.fetchOrganization("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");

    console.log(orgData)

  });
});
