//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Counters.sol";

contract GLLOC {
    using Counters for Counters.Counter;
    Counters.Counter private _userCount;
    Counters.Counter private _taskCount;

    address public owner;

    // Structs
    struct Oraganisation {
        address orgId;
        address orgOwner;
        string name;
        string website;
        string description;
        string logo;
        string[] departments;
        address[] users;
    }

    struct User {
        uint256 userId;
        address orgId;
        address userAddress;
        string name;
        string email;
        string avatar;
        string mobile;
        string role;
        string team;
        string skills;
        uint256[] checkIn;
        uint256[] checkOut;
        Task[] tasks;
    }

    struct Task {
        uint256 taskId;
        string taskName;
        string taskDescription;
        string taskStatus;
        uint256 taskCreatedDate;
    }
    // Structs

    // Mapppings
    mapping(address => Oraganisation) public organizations;
    mapping(address => User) public users;
    string[] departments;
    // Mapppings

    address[] private usersAddresses;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "Only owner have authority for this action."
        );
        _;
    }

    function addOrganisation(
        string memory _name,
        string memory _website,
        string memory _description,
        string memory _logo
    ) external {
        Oraganisation storage org = organizations[msg.sender];
        org.orgId = msg.sender;
        org.orgOwner = msg.sender;
        org.name = _name;
        org.description = _description;
        org.website = _website;
        org.logo = _logo;
    }

    function addOrgOwner(
        string memory _orgOwnerName,
        string memory _orgOwnerEmail,
        string memory _orgOwnerAvatar,
        string memory _orgOwnerMobile,
        string memory _orgOwnerRole,
        string memory _orgOwnerTeam,
        string memory _orgOwnerSkills
    ) external {
        Oraganisation storage org = organizations[msg.sender];
        require(org.orgOwner == msg.sender, "Only org owner can add org owner");
        User storage user = users[msg.sender];
        user.userId = block.timestamp;
        user.orgId = msg.sender;
        user.userAddress = msg.sender;
        user.name = _orgOwnerName;
        user.email = _orgOwnerEmail;
        user.avatar = _orgOwnerAvatar;
        user.mobile = _orgOwnerMobile;
        user.role = _orgOwnerRole;
        user.team = _orgOwnerTeam;
        user.skills = _orgOwnerSkills;
    }

    function fetchOrganization(address _orgId)
        external
        view
        returns (Oraganisation memory)
    {
        return organizations[_orgId];
    }

    function addDepartment(string memory _department) external {
        Oraganisation storage org = organizations[msg.sender];
        require(
            msg.sender == org.orgOwner,
            "Only orgOwner have access to this action"
        );
        org.departments.push(_department);
    }

    function changeOrgOwner(address _orgId, address _orgOwner) external {
        Oraganisation storage org = organizations[_orgId];
        require(
            msg.sender == org.orgOwner,
            "Only current orgOwner can set new orgOwner"
        );
        org.orgOwner = _orgOwner;
    }

    function addUser(
        address _userAddress,
        string memory _name,
        string memory _email,
        string memory _avatar,
        string memory _role,
        string memory _team
    ) external {
        Oraganisation storage org = organizations[msg.sender];
        require(
            msg.sender == org.orgOwner,
            "Only orgOwner have access to this action"
        );
        User storage user = users[_userAddress];
        user.userId = block.timestamp;
        user.userAddress = _userAddress;
        user.orgId = msg.sender;
        user.name = _name;
        user.email = _email;
        user.avatar = _avatar;
        user.role = _role;
        user.team = _team;
        usersAddresses.push(_userAddress);
        org.users.push(_userAddress);
    }

    function loginUser() external view returns (User memory) {
        User storage user = users[msg.sender];
        return user;
    }

    function searchUser(address _userAddress)
        external
        view
        returns (User memory)
    {
        User storage user = users[_userAddress];
        return user;
    }

    function removeUser(address _orgId, address _userAddress) external {
        Oraganisation storage org = organizations[_orgId];
        require(
            msg.sender == org.orgOwner,
            "Only orgOwner have access to this action"
        );
        delete users[_userAddress];
    }

    function changeUsername(string memory _name) external {
        User storage user = users[msg.sender];

        require(
            user.userAddress == msg.sender,
            "Only owner can change username"
        );

        require(
            bytes(_name).length <= 32 && bytes(_name).length > 0,
            "Username should have minimum 1 and maximum 32 charactor"
        );

        user.name = _name;
    }

    function changeUseremail(string memory _email) external {
        User storage user = users[msg.sender];

        require(
            user.userAddress == msg.sender,
            "Only owner can change username"
        );

        require(
            bytes(_email).length <= 32 && bytes(_email).length > 0,
            "Email should be a valid email address"
        );

        user.email = _email;
    }

    function changeUseravatar(string memory _avatar) external {
        User storage user = users[msg.sender];

        require(
            user.userAddress == msg.sender,
            "Only owner can change username"
        );

        require(
            bytes(_avatar).length <= 32 && bytes(_avatar).length > 0,
            "Your avatar isn't in a valid format"
        );

        user.avatar = _avatar;
    }

    function changeUsermobile(string memory _mobile) external {
        User storage user = users[msg.sender];

        require(
            user.userAddress == msg.sender,
            "Only owner can change username"
        );
        require(
            bytes(_mobile).length == 10,
            "Mobile number should be a valid mobile number"
        );

        user.mobile = _mobile;
    }

    function changeUserrole(address _userAddress, string memory _role)
        external
    {
        User storage user = users[_userAddress];
        Oraganisation storage org = organizations[user.orgId];

        require(
            msg.sender == org.orgOwner,
            "Only orgOwner can have access to this action"
        );

        user.role = _role;
    }

    function changeUserteam(address _userAddress, string memory _team)
        external
    {
        User storage user = users[_userAddress];
        Oraganisation storage org = organizations[user.orgId];

        require(
            msg.sender == org.orgOwner,
            "Only orgOwner can have access to this action"
        );

        user.role = _team;
    }

    function changeUserskills(string memory _skills) external {
        User storage user = users[msg.sender];
        require(
            user.userAddress == msg.sender,
            "Only owner can change username"
        );
        require(bytes(_skills).length > 0, "Minimum one skill required");

        user.skills = _skills;
    }

    function checkIn() external {
        User storage user = users[msg.sender];

        user.checkIn.push(block.timestamp);
    }

    function checkOut() external {
        User storage user = users[msg.sender];

        user.checkOut.push(block.timestamp);
    }

    function assignTask(
        address _userAddress,
        address _orgId,
        string memory _taskName,
        string memory _taskDescription
    ) external {
        Oraganisation memory org = organizations[_orgId];
        require(msg.sender == org.orgOwner, "Only orgOwner can assign task");
        Task memory task;
        task.taskId = _taskCount.current();
        task.taskName = _taskName;
        task.taskDescription = _taskDescription;
        task.taskStatus = "pending";
        task.taskCreatedDate = block.timestamp;
        _taskCount.increment();

        User storage user = users[_userAddress];
        user.tasks.push(task);
    }

    function comleteTask(
        address _orgId,
        address _userAddress,
        uint256 _taskId
    ) external {
        Oraganisation memory org = organizations[_orgId];
        require(msg.sender == org.orgOwner, "Only orgOwner can complete task");
        User storage user = users[_userAddress];
        user.tasks[_taskId].taskStatus = "completed";
    }
}
