const { expect } = require("chai");
const { ethers } = require("hardhat");
const moment = require("moment");

describe("CRM", function () {
  it("Should create the GLLOC", async function () {
    const Crm = await ethers.getContractFactory("CRM");
    const crm = await Crm.deploy();
    await crm.deployed();

    console.log("CRM deployed to: ", crm.address);

    // console.log(await crm.owner());

    await crm.addOrganisation(
      "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      "GLLOC",
      "www.website.com",
      "description",
      "logo"
    );

    await crm.addOrgOwner(
      "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      "Gaurav Meena",
      "gurumeena41.gm@gmail.com",
      "avatar",
      "8769973256",
      "CEO",
      "Management",
      "Web Development,UI/UX design"
    );

    await crm.addDepartment(
      "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      "Management"
    );
    await crm.addDepartment(
      "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      "Engineering"
    );

    await crm.addUser(
      "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      "0xFa3103DEFDAA1203b0706525922a558c2d9cc94c",
      "Guru Meena",
      "guru@gmail.com",
      "avatar",
      "Web Developer",
      "Engineering"
    );

    // await crm.removeUser(
    //   "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    //   "0xFa3103DEFDAA1203b0706525922a558c2d9cc94c"
    // );

    // await crm.changeUsername("Utsav");
    // await crm.changeUseremail("utsav@gmail.com");
    // await crm.changeUseravatar("utsav avatar");
    // await crm.changeUsermobile("1234567890");
    // await crm.changeUserrole("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266","ASD");
    // await crm.changeUserteam("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266","Marketing");
    // await crm.changeUserskills("Python,JavaScript");
    await crm.checkIn();
    await crm.checkOut();

    await crm.assignTask(
      "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      "Task 1 Name",
      "Task 1 Description"
    );
    await crm.assignTask(
      "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      "Task 2 Name",
      "Task 2 Description"
    );

    await crm.comleteTask(
      "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      0
    );

    let org = await crm.fetchOrganization(
      "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
    );

    console.log(org);
    // console.log(await crm.searchUser(org.orgOwner));
    // console.log(await crm.searchUser(org.orgOwner).tasks);
    // console.log(org);
  });
});
