const { expect } = require("chai");
const { ethers } = require("hardhat");
const moment = require("moment");

describe("CRM", function () {
  it("Should create the CRM and admin", async function () {
    const Crm = await ethers.getContractFactory("CRM");
    const crm = await Crm.deploy(
      "Guru",
      "gurumeena41.gm@gmail.com",
      8769973256,
      "guru.png"
    );
    await crm.deployed();

    console.log("CRM deployed to: ", crm.address);

    // console.log(admin.mobile.toNumber());

    await crm.changeAdminavatar("admin.png");
    const admin = await crm.admin();

    // console.log(admin);

    // await crm.addUser("guru", "guru@gmail.com", false, "Blockchain Developer");
    // await crm.addUser("Guru", "guru@gmail.com", false, "Blockchain Developer");

    // await crm.checkIn(1);
    // await crm.checkOut(1);
    // await crm.checkIn(1);
    // await crm.checkOut(1);
    // await crm.checkIn(1);
    // await crm.checkOut(1);

    // let users = await crm.fetchUsers();

    // const searchUser = await crm.searchUser(1);
    // console.log(users);

    // await crm.removeUser(2);
    // console.log("Deleted");

    // users = await crm.fetchUsers();

    // for (let i = 0; i < users.length; i++) {
    //   if (
    //     users[i].userAddress !== "0x0000000000000000000000000000000000000000"
    //   ) {
    //     console.log(users[i].name);
    //   }
    // }

    await crm.addUser(
      "Gaurav Meena",
      "garauvmeena@gmail.com",
      false,
      "Developer",
      "Commerce-Cloud"
    );

    // await crm.changeUserteam(1, "Commerce Cloud");

    await crm.assignTask(1, "testing", "testing description");
    let user = await crm.searchUser(1);
    console.log(user.tasks);
    await crm.comleteTask(1, 0);

    user = await crm.searchUser(1);
    console.log(user.tasks);
  });
});
