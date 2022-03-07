const { expect } = require("chai");
const { ethers } = require("hardhat");
const moment = require("moment");

describe("CRM", function () {
  it("Should create the CRM and admin", async function () {
    const Crm = await ethers.getContractFactory("CRM");
    const crm = await Crm.deploy(
      "Gaurav Meena",
      "gurumeena41.gm@gmail.com",
      8769973256,
      "https://avatars.dicebear.com/api/adventurer-neutral/gaurav_meena:seed.svg",
      "Web development"
    );
    await crm.deployed();

    console.log("CRM deployed to: ", crm.address);

    const admin = await crm.CEO();

    // console.log(admin);

    await crm.addUser(
      "0xFa3103DEFDAA1203b0706525922a558c2d9cc94c",
      "Guru Meena",
      "gurumeena41.gm@gmail.com",
      "https://avatars.dicebear.com/api/adventurer-neutral/guru_meena:seed.svg",
      "Training Manager",
      "Management"
    );

    await crm.addDepartment("Management");
    await crm.addDepartment("Hr Department");

    let departments = await crm.fetchDepartments();

    console.log(departments);

    // console.log(
    //   await crm.searchUser("0xFa3103DEFDAA1203b0706525922a558c2d9cc94c")
    // );
  });
});
