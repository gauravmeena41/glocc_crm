const { expect } = require("chai");
const { ethers } = require("hardhat");
const moment = require("moment");

describe("CRM", function () {
  it("Should create the CRM and admin", async function () {
    const Crm = await ethers.getContractFactory("CRM");
    const crm = await Crm.deploy("Guru", "gurumeena41.gm@gmail.com");
    await crm.deployed();

    console.log("CRM deployed to: ", crm.address);

    const admin = await crm.admin();

    // console.log(admin);

    await crm.addUser(
      "Gaurav Meena",
      "garauvmeena@gmail.com",
      false,
      "Developer"
    );

    // await crm.addUser(
    //   "Gaurav",
    //   "garauv@gmail.com",
    //   false,
    //   "Blockchain Developer"
    // );

    await crm.checkIn(1);
    await crm.checkOut(1);
    await crm.checkIn(1);
    await crm.checkOut(1);
    await crm.checkIn(1);
    await crm.checkOut(1);

    let users = await crm.fetchUsers();

    // const searchUser = await crm.searchUser(1);
    console.log(users);

    await crm.removeUser(1);
    console.log("Deleted");

    users = await crm.fetchUsers();

    console.log(users);
  });
});
