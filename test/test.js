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

    await glloc.updateUser(
      "Gaurav",
      "gurumeena@gmail.com",
      "",
      "",
      "Single",
      0
    );
    let user = await glloc.loginUser();

    console.log(user);
  });
});
