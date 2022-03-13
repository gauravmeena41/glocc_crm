const { expect } = require("chai");
const { ethers } = require("hardhat");
const moment = require("moment");

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

    await glloc.addDepartment("Management");
    await glloc.addDepartment("Engineering");

    await glloc.addUser(
      "0xFa3103DEFDAA1203b0706525922a558c2d9cc94c",
      "Guru Meena",
      "guru@gmail.com",
      "https://avatars.dicebear.com/api/adventurer-neutral/Guru-Meena:seed.svg",
      "Web Developer",
      "Engineering"
    );

    await glloc.checkIn();
    await glloc.checkOut();

    await glloc.assignTask(
      "0xFa3103DEFDAA1203b0706525922a558c2d9cc94c",
      "Task 1 Name",
      "Task 1 Description"
    );
    await glloc.assignTask(
      "0xFa3103DEFDAA1203b0706525922a558c2d9cc94c",
      "Task 2 Name",
      "Task 2 Description"
    );
    await glloc.comleteTask(1);

    // await glloc.comleteTask(
    //   "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    //   "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    //   1
    // );
    // await glloc.comleteTask(
    //   "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    //   "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    //   0
    // );

    let org = await glloc.fetchOrganization(
      "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
    );

    // console.log(org);
    // console.log(await glloc.searchUser(org.orgOwner));
    let user = await glloc.searchUser(
      "0xFa3103DEFDAA1203b0706525922a558c2d9cc94c"
    );

    user.tasks.map(async (task) => {
      console.log(await glloc.searchTask(task.toNumber()));
    });
  });
});
