//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Counters.sol";

contract GLLOC {
    // Counters
    using Counters for Counters.Counter;
    Counters.Counter private _userCount;
    Counters.Counter private _taskCount;
    // Counters

    // Owner
    address private owner;
    // Owner

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
        uint256 dob;
        string maritalStatus;
        string role;
        string team;
        string skills;
        uint256[] checkIn;
        uint256[] checkOut;
        uint256[] tasks;
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
    mapping(address => Oraganisation) private organizations;
    mapping(address => User) private users;
    mapping(uint256 => Task) private tasks;
    // Mapppings

    // Events
    event LogOrgCreated(address orgId);

    // Events

    constructor() {
        owner = msg.sender;
    }

    // Modifires
    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "Only owner have authority for this action."
        );
        _;
    }

    // Modifires

    // Org specific functions
    function addOrganisation(
        string memory _name,
        string memory _website,
        string memory _description,
        string memory _logo,
        string memory _Owner,
        string memory _ownerEmail,
        string memory _ownerAvatar,
        string memory _ownerMobile,
        string memory _ownerSkills
    ) external {
        Oraganisation storage org = organizations[msg.sender];
        org.orgId = msg.sender;
        org.orgOwner = msg.sender;
        org.name = _name;
        org.description = _description;
        org.website = _website;
        org.logo = _logo;
        org.departments.push("Management");
        User storage user = users[msg.sender];
        user.userId = block.timestamp;
        user.orgId = msg.sender;
        user.userAddress = msg.sender;
        user.name = _Owner;
        user.email = _ownerEmail;
        user.avatar = _ownerAvatar;
        user.mobile = _ownerMobile;
        user.role = "Chief Executive Officer";
        user.team = "Management";
        user.skills = _ownerSkills;
        emit LogOrgCreated(msg.sender);
    }

    function fetchOrganization(address _orgId)
        external
        view
        returns (Oraganisation memory)
    {
        Oraganisation storage org = organizations[_orgId];
        require(
            org.orgId != 0x0000000000000000000000000000000000000000,
            "Organization not found."
        );
        return organizations[_orgId];
    }

    function addDepartment(string memory _department) external {
        Oraganisation storage org = organizations[msg.sender];
        require(
            org.orgId != 0x0000000000000000000000000000000000000000,
            "Organization not found."
        );
        org.departments.push(_department);
    }

    function changeOrgOwner(address _newOrgOwner) external {
        Oraganisation storage org = organizations[msg.sender];

        require(
            org.orgId != 0x0000000000000000000000000000000000000000,
            "Organization not found."
        );
        require(
            msg.sender == org.orgOwner,
            "Only current orgOwner can set new orgOwner"
        );
        User storage oldOwner = users[msg.sender];
        User storage newOwner = users[_newOrgOwner];
        require(
            newOwner.userAddress == _newOrgOwner,
            "New orgOwner must be registered user"
        );
        newOwner.role = "Chief Executive Officer";
        newOwner.team = "Management";
        newOwner.orgId = _newOrgOwner;
        oldOwner.role = "Human Resources Manager";
        oldOwner.orgId = _newOrgOwner;
        Oraganisation storage newOrg = organizations[_newOrgOwner];
        newOrg.orgOwner = _newOrgOwner;
        newOrg.orgId = _newOrgOwner;
        newOrg.name = org.name;
        newOrg.description = org.description;
        newOrg.website = org.website;
        newOrg.logo = org.logo;
        newOrg.departments = org.departments;
        newOrg.users = org.users;

        for (uint256 i = 0; i < org.users.length; i++) {
            if (newOrg.users[i] == _newOrgOwner) {
                newOrg.users[i] = msg.sender;
            }
        }

        for (uint256 i = 0; i < org.users.length; i++) {
            User storage user = users[org.users[i]];
            user.orgId = _newOrgOwner;
        }

        delete organizations[msg.sender];
    }

    // Org specific functions

    // CEO specific functions
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
            org.orgId != 0x0000000000000000000000000000000000000000,
            "Organization not found."
        );
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
        org.users.push(_userAddress);
    }

    function assignTask(
        address _userAddress,
        string memory _taskName,
        string memory _taskDescription
    ) external {
        Oraganisation memory org = organizations[msg.sender];
        require(
            org.orgId != 0x0000000000000000000000000000000000000000,
            "Organization not found."
        );
        require(
            msg.sender == org.orgOwner,
            "Only orgOwner have access to this action"
        );

        Task storage task = tasks[_taskCount.current()];
        task.taskId = _taskCount.current();
        task.taskName = _taskName;
        task.taskDescription = _taskDescription;
        task.taskStatus = "pending";
        task.taskCreatedDate = block.timestamp;
        _taskCount.increment();

        User storage user = users[_userAddress];
        user.tasks.push(task.taskId);
    }

    function searchTask(uint256 _taskId) external view returns (Task memory) {
        Task storage task = tasks[_taskId];
        return task;
    }

    function comleteTask(uint256 _taskId) external {
        Oraganisation memory org = organizations[msg.sender];
        require(
            org.orgId != 0x0000000000000000000000000000000000000000,
            "Organization not found."
        );
        require(
            msg.sender == org.orgOwner,
            "Only orgOwner have access to this action"
        );

        Task storage task = tasks[_taskId];
        task.taskStatus = "completed";
    }

    function changeUserrole(address _userAddress, string memory _role)
        external
    {
        User storage user = users[_userAddress];
        Oraganisation storage org = organizations[msg.sender];
        require(
            org.orgId != 0x0000000000000000000000000000000000000000,
            "Organization not found."
        );
        require(
            msg.sender == org.orgOwner,
            "Only orgOwner have access to this action"
        );

        user.role = _role;
    }

    function changeUserteam(address _userAddress, string memory _team)
        external
    {
        User storage user = users[_userAddress];
        Oraganisation storage org = organizations[msg.sender];
        require(
            org.orgId != 0x0000000000000000000000000000000000000000,
            "Organization not found."
        );
        require(
            msg.sender == org.orgOwner,
            "Only orgOwner have access to this action"
        );

        user.team = _team;
    }

    function removeUser(address _userAddress) external {
        Oraganisation storage org = organizations[msg.sender];
        require(
            org.orgId != 0x0000000000000000000000000000000000000000,
            "Organization not found."
        );

        require(
            msg.sender == org.orgOwner,
            "Only orgOwner have access to this action"
        );

        uint256 userIndex = org.users.length + 1;

        for (uint256 i = 0; i < org.users.length; i++) {
            if (org.users[i] == _userAddress) {
                userIndex = i;
                break;
            }
        }

        require(
            userIndex >= 0 && userIndex <= org.users.length,
            "User not found"
        );

        for (uint256 i = userIndex; i < org.users.length - 1; i++) {
            org.users[i] = org.users[i + 1];
        }

        org.users.pop();
        delete users[_userAddress];
    }

    // CEO specific functions

    // User specific functions

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

    function updateUser(
        string memory _name,
        string memory _email,
        string memory _mobile,
        string memory _avatar,
        string memory _userSkills,
        string memory _maritalStatus,
        uint256 _dob
    ) external {
        User storage user = users[msg.sender];
        if (bytes(_name).length > 0) user.name = _name;
        if (bytes(_email).length > 0) user.email = _email;
        if (bytes(_mobile).length > 0) user.mobile = _mobile;
        if (bytes(_avatar).length > 0) user.avatar = _avatar;
        if (bytes(_userSkills).length > 0) user.skills = _userSkills;
        if (bytes(_maritalStatus).length > 0)
            user.maritalStatus = _maritalStatus;
        if (_dob > 0) user.dob = _dob;
    }

    function checkIn() external {
        User storage user = users[msg.sender];

        user.checkIn.push(block.timestamp);
    }

    function checkOut() external {
        User storage user = users[msg.sender];

        user.checkOut.push(block.timestamp);
    }
    // User specific functions
}
