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
      "Manage Users,Manage Wifi"
    );
    await crm.deployed();

    console.log("CRM deployed to: ", crm.address);

    // console.log(admin.mobile.toNumber());

    // await crm.changeAdminavatar("admin.png");
    const admin = await crm.admin();

    console.log(admin);

    // await crm.addUser(
    //   "0xFa3103DEFDAA1203b0706525922a558c2d9cc94c",
    //   "Gaurav Meena",
    //   "garauvmeena@gmail.com",
    //   false,
    //   "Developer",
    //   "Commerce-Cloud"
    // );
    // await crm.addUser(
    //   "0xdd2fd4581271e230360230f9337d5c0430bf44c0",
    //   "Guru Meena",
    //   "guru@gmail.com",
    //   false,
    //   "Developer",
    //   "Commerce-Cloud"
    // );
    // await crm.addUser(
    //   "0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199",
    //   "Guru Meena",
    //   "guru@gmail.com",
    //   false,
    //   "Developer",
    //   "Commerce-Cloud"
    // );

    // await crm.changeUsername(
    //   "0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199",
    //   "Guru"
    // );

    // await crm.changeUserrole(
    //   "0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199",
    //   "Blockchain Developer"
    // );

    // let users = await crm.fetchUsersAddress();

    // users.map(async (user) => {
    //   let temp = await crm.searchUser(user);
    //   console.log(temp.name);
    //   console.log(temp.role);
    // });
  });
});
