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
        uint64 userId;
        address orgId;
        address userAddress;
        string name;
        string email;
        string avatar;
        string mobile;
        uint64 dob;
        string maritalStatus;
        string skills;
        string role;
        string team;
        address reportingTo;
        uint64[] checkIn;
        uint64[] checkOut;
        uint64[] tasks;
    }

    struct Task {
        uint64 taskId;
        string taskName;
        string taskDescription;
        string taskStatus;
        uint64 taskCreatedDate;
        uint64 taskDueDate;
        uint64 taskCompletedDate;
    }
    // Structs

    // Mapppings
    mapping(address => Oraganisation) private organizations;
    mapping(address => User) private users;
    mapping(uint64 => Task) private tasks;
    // Mapppings

    // Events
    event LogOrgCreated(address orgId);
    event LogUserCreated(address userId);
    event LogTaskCreated(uint64 taskId);
    event LogTaskCompleted(uint64 taskId);

    // Events

    constructor() {
        owner = msg.sender;
    }

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
        organizations[msg.sender].orgId = msg.sender;
        organizations[msg.sender].orgOwner = msg.sender;
        organizations[msg.sender].name = _name;
        organizations[msg.sender].description = _description;
        organizations[msg.sender].website = _website;
        organizations[msg.sender].logo = _logo;
        organizations[msg.sender].departments.push("Management");
        users[msg.sender].userId = uint64(block.timestamp);
        users[msg.sender].orgId = msg.sender;
        users[msg.sender].userAddress = msg.sender;
        users[msg.sender].name = _Owner;
        users[msg.sender].email = _ownerEmail;
        users[msg.sender].avatar = _ownerAvatar;
        users[msg.sender].mobile = _ownerMobile;
        users[msg.sender].role = "Chief Executive Officer";
        users[msg.sender].team = "Management";
        users[msg.sender].skills = _ownerSkills;
        emit LogOrgCreated(msg.sender);
    }

    function fetchOrganization(address _orgId)
        external
        view
        returns (Oraganisation memory)
    {
        return organizations[_orgId];
    }

    function addDepartment(string memory _department) external {
        organizations[msg.sender].departments.push(_department);
    }

    function changeOrgOwner(address _newOrgOwner) external {
        require(
            msg.sender == organizations[msg.sender].orgOwner,
            "Only current orgOwner"
        );
        require(
            users[_newOrgOwner].userAddress == _newOrgOwner,
            "New orgOwner must be registered"
        );
        users[_newOrgOwner].role = "Chief Executive Officer";
        users[_newOrgOwner].team = "Management";
        users[_newOrgOwner].orgId = _newOrgOwner;
        users[msg.sender].role = "Human Resources Manager";
        users[msg.sender].orgId = _newOrgOwner;
        Oraganisation storage newOrg = organizations[_newOrgOwner];
        newOrg.orgOwner = _newOrgOwner;
        newOrg.orgId = _newOrgOwner;
        newOrg.name = organizations[msg.sender].name;
        newOrg.description = organizations[msg.sender].description;
        newOrg.website = organizations[msg.sender].website;
        newOrg.logo = organizations[msg.sender].logo;
        newOrg.departments = organizations[msg.sender].departments;
        newOrg.users = organizations[msg.sender].users;

        for (uint64 i = 0; i < organizations[msg.sender].users.length; i++) {
            users[organizations[msg.sender].users[i]].orgId = _newOrgOwner;
            if (newOrg.users[i] == _newOrgOwner) {
                newOrg.users[i] = msg.sender;
            }
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
        require(
            msg.sender == organizations[msg.sender].orgOwner,
            "Only orgOwner"
        );
        users[_userAddress].userId = uint64(block.timestamp);
        users[_userAddress].userAddress = _userAddress;
        users[_userAddress].orgId = msg.sender;
        users[_userAddress].name = _name;
        users[_userAddress].email = _email;
        users[_userAddress].avatar = _avatar;
        users[_userAddress].role = _role;
        users[_userAddress].team = _team;
        users[_userAddress].reportingTo = msg.sender;
        organizations[msg.sender].users.push(_userAddress);
        emit LogUserCreated(_userAddress);
    }

    function removeUser(address _orgId, address _userAddress) external {
        Oraganisation storage org = organizations[_orgId];
        require(
            msg.sender == org.orgOwner,
            "Only orgOwner have access to this action"
        );
        delete users[_userAddress];
    }

    function assignTask(
        address _userAddress,
        string memory _taskName,
        string memory _taskDescription
    ) external {
        require(
            msg.sender == organizations[msg.sender].orgOwner,
            "Only orgOwner"
        );
        tasks[uint64(_taskCount.current())].taskId = uint64(
            _taskCount.current()
        );
        tasks[uint64(_taskCount.current())].taskName = _taskName;
        tasks[uint64(_taskCount.current())].taskDescription = _taskDescription;
        tasks[uint64(_taskCount.current())].taskStatus = "pending";
        tasks[uint64(_taskCount.current())].taskCreatedDate = uint64(
            block.timestamp
        );
        _taskCount.increment();
        users[_userAddress].tasks.push(
            tasks[uint64(_taskCount.current())].taskId
        );
        emit LogTaskCreated(tasks[uint64(_taskCount.current())].taskId);
    }

    function searchTask(uint64 _taskId) external view returns (Task memory) {
        return tasks[_taskId];
    }

    function comleteTask(uint64 _taskId) external {
        require(
            msg.sender == organizations[msg.sender].orgOwner,
            "Only orgOwner"
        );
        tasks[_taskId].taskStatus = "completed";
        emit LogTaskCompleted(_taskId);
    }

    function changeUserrole(address _userAddress, string memory _role)
        external
    {
        require(
            msg.sender == organizations[msg.sender].orgOwner,
            "Only orgOwner"
        );

        users[_userAddress].role = _role;
    }

    function changeUserteam(address _userAddress, string memory _team)
        external
    {
        require(
            msg.sender == organizations[msg.sender].orgOwner,
            "Only orgOwner"
        );

        users[_userAddress].team = _team;
    }

    function changeReportingTo(address _userAddress, address _reportingTo)
        external
    {
        require(
            msg.sender == organizations[msg.sender].orgOwner,
            "Only orgOwner"
        );
        users[_userAddress].reportingTo = _reportingTo;
    }

    function removeUser(address _userAddress) external {
        require(
            msg.sender == organizations[msg.sender].orgOwner,
            "Only orgOwner"
        );

        uint64 userIndex = uint64(organizations[msg.sender].users.length) + 1;

        for (uint64 i = 0; i < organizations[msg.sender].users.length; i++) {
            if (organizations[msg.sender].users[i] == _userAddress) {
                userIndex = i;
                break;
            }
        }

        require(
            userIndex >= 0 &&
                userIndex <= organizations[msg.sender].users.length,
            "User not found"
        );

        for (
            uint64 i = userIndex;
            i < organizations[msg.sender].users.length - 1;
            i++
        ) {
            organizations[msg.sender].users[i] = organizations[msg.sender]
                .users[i + 1];
        }

        organizations[msg.sender].users.pop();
        delete users[_userAddress];
    }

    // CEO specific functions

    // User specific functions

    function loginUser() external view returns (User memory) {
        return users[msg.sender];
    }

    function searchUser(address _userAddress)
        external
        view
        returns (User memory)
    {
        return users[_userAddress];
    }

    function updateUser(
        string memory _name,
        string memory _email,
        string memory _mobile,
        string memory _avatar,
        string memory _userSkills,
        string memory _maritalStatus,
        uint64 _dob
    ) external {
        if (bytes(_name).length > 0) users[msg.sender].name = _name;
        if (bytes(_email).length > 0) users[msg.sender].email = _email;
        if (bytes(_mobile).length > 0) users[msg.sender].mobile = _mobile;
        if (bytes(_avatar).length > 0) users[msg.sender].avatar = _avatar;
        if (bytes(_userSkills).length > 0)
            users[msg.sender].skills = _userSkills;
        if (bytes(_maritalStatus).length > 0)
            users[msg.sender].maritalStatus = _maritalStatus;
        if (_dob > 0) users[msg.sender].dob = _dob;
    }

    function checkIn() external {
        require(
            users[msg.sender].checkIn.length ==
                users[msg.sender].checkOut.length,
            "Already checked in"
        );
        users[msg.sender].checkIn.push(uint64(block.timestamp));
    }

    function checkOut() external {
        require(
            users[msg.sender].checkIn.length >
                users[msg.sender].checkOut.length,
            "Already checked out"
        );
        users[msg.sender].checkOut.push(uint64(block.timestamp));
    }
    // User specific functions
}
