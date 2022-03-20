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
        user.userId = uint64(block.timestamp);
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
        return organizations[_orgId];
    }

    function addDepartment(string memory _department) external {
        require(
            organizations[msg.sender].orgId !=
                0x0000000000000000000000000000000000000000,
            "Org not found."
        );
        organizations[msg.sender].departments.push(_department);
    }

    function changeOrgOwner(address _newOrgOwner) external {
        require(
            organizations[msg.sender].orgId !=
                0x0000000000000000000000000000000000000000,
            "Org not found."
        );
        require(
            msg.sender == organizations[msg.sender].orgOwner,
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
        newOrg.name = organizations[msg.sender].name;
        newOrg.description = organizations[msg.sender].description;
        newOrg.website = organizations[msg.sender].website;
        newOrg.logo = organizations[msg.sender].logo;
        newOrg.departments = organizations[msg.sender].departments;
        newOrg.users = organizations[msg.sender].users;

        for (uint64 i = 0; i < organizations[msg.sender].users.length; i++) {
            if (newOrg.users[i] == _newOrgOwner) {
                newOrg.users[i] = msg.sender;
            }
        }

        for (uint64 i = 0; i < organizations[msg.sender].users.length; i++) {
            User storage user = users[organizations[msg.sender].users[i]];
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
        require(
            organizations[msg.sender].orgId !=
                0x0000000000000000000000000000000000000000,
            "Org not found."
        );
        require(
            msg.sender == organizations[msg.sender].orgOwner,
            "Only orgOwner have access to this action"
        );

        User storage user = users[_userAddress];
        user.userId = uint64(block.timestamp);
        user.userAddress = _userAddress;
        user.orgId = msg.sender;
        user.name = _name;
        user.email = _email;
        user.avatar = _avatar;
        user.role = _role;
        user.team = _team;
        user.reportingTo = msg.sender;
        organizations[msg.sender].users.push(_userAddress);
        emit LogUserCreated(_userAddress);
    }

    function assignTask(
        address _userAddress,
        string memory _taskName,
        string memory _taskDescription
    ) external {
        require(
            organizations[msg.sender].orgId !=
                0x0000000000000000000000000000000000000000,
            "Org not found."
        );
        require(
            msg.sender == organizations[msg.sender].orgOwner,
            "Only orgOwner have access to this action"
        );

        Task storage task = tasks[uint64(_taskCount.current())];
        task.taskId = uint64(_taskCount.current());
        task.taskName = _taskName;
        task.taskDescription = _taskDescription;
        task.taskStatus = "pending";
        task.taskCreatedDate = uint64(block.timestamp);
        _taskCount.increment();

        User storage user = users[_userAddress];
        user.tasks.push(task.taskId);
        emit LogTaskCreated(task.taskId);
    }

    function searchTask(uint64 _taskId) external view returns (Task memory) {
        return tasks[_taskId];
    }

    function comleteTask(uint64 _taskId) external {
        require(
            organizations[msg.sender].orgId !=
                0x0000000000000000000000000000000000000000,
            "Org not found."
        );
        require(
            msg.sender == organizations[msg.sender].orgOwner,
            "Only orgOwner have access to this action"
        );

        Task storage task = tasks[_taskId];
        task.taskStatus = "completed";
        emit LogTaskCompleted(_taskId);
    }

    function changeUserrole(address _userAddress, string memory _role)
        external
    {
        User storage user = users[_userAddress];
        require(
            organizations[msg.sender].orgId !=
                0x0000000000000000000000000000000000000000,
            "Org not found."
        );
        require(
            msg.sender == organizations[msg.sender].orgOwner,
            "Only orgOwner have access to this action"
        );

        user.role = _role;
    }

    function changeUserteam(address _userAddress, string memory _team)
        external
    {
        User storage user = users[_userAddress];
        require(
            organizations[msg.sender].orgId !=
                0x0000000000000000000000000000000000000000,
            "Org not found."
        );
        require(
            msg.sender == organizations[msg.sender].orgOwner,
            "Only orgOwner have access to this action"
        );

        user.team = _team;
    }

    function changeReportingTo(address _userAddress, address _reportingTo)
        external
    {
        require(
            organizations[msg.sender].orgId !=
                0x0000000000000000000000000000000000000000,
            "Org not found."
        );
        require(
            msg.sender == organizations[msg.sender].orgOwner,
            "Only orgOwner have access to this action"
        );

        User storage user = users[_userAddress];
        user.reportingTo = _reportingTo;
    }

    function removeUser(address _userAddress) external {
        require(
            organizations[msg.sender].orgId !=
                0x0000000000000000000000000000000000000000,
            "Org not found."
        );

        require(
            msg.sender == organizations[msg.sender].orgOwner,
            "Only orgOwner have access to this action"
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
        users[msg.sender].checkIn.push(uint64(block.timestamp));
    }

    function checkOut() external {
        users[msg.sender].checkOut.push(uint64(block.timestamp));
    }
    // User specific functions
}
