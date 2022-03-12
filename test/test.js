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
      "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      "GLLOC",
      "www.website.com",
      "description",
      "logo"
    );

    await glloc.addOrgOwner(
      "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      "Gaurav Meena",
      "gurumeena41.gm@gmail.com",
      "avatar",
      "8769973256",
      "CEO",
      "Management",
      "Web Development,UI/UX design"
    );

    await glloc.addDepartment(
      "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      "Management"
    );
    await glloc.addDepartment(
      "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      "Engineering"
    );

    await glloc.addUser(
      "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      "0xFa3103DEFDAA1203b0706525922a558c2d9cc94c",
      "Guru Meena",
      "guru@gmail.com",
      "avatar",
      "Web Developer",
      "Engineering"
    );

    // await glloc.removeUser(
    //   "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    //   "0xFa3103DEFDAA1203b0706525922a558c2d9cc94c"
    // );

    // await glloc.changeUsername("Utsav");
    // await glloc.changeUseremail("utsav@gmail.com");
    // await glloc.changeUseravatar("utsav avatar");
    // await glloc.changeUsermobile("1234567890");
    // await glloc.changeUserrole("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266","ASD");
    // await glloc.changeUserteam("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266","Marketing");
    // await glloc.changeUserskills("Python,JavaScript");
    await glloc.checkIn();
    await glloc.checkOut();

    await glloc.assignTask(
      "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      "Task 1 Name",
      "Task 1 Description"
    );
    await glloc.assignTask(
      "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      "Task 2 Name",
      "Task 2 Description"
    );

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
    console.log(await glloc.searchUser(org.orgOwner).tasks);
  });
});
