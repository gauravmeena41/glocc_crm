//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Counters.sol";

contract CRM {
    using Counters for Counters.Counter;
    Counters.Counter private _userCount;
    Counters.Counter private _taskCount;

    string[] private teams = [
        "Commerce-cloud",
        "Marketing-cloud",
        "Velocity-cloud",
        "Health-cloud"
    ];

    struct User {
        address userAddress;
        string name;
        string email;
        string avatar;
        uint256 mobile;
        string role;
        string team;
        bool isAdmin;
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

    User public admin;

    mapping(address => User) public users;

    address[] private usersAddresses;

    constructor(
        string memory _name,
        string memory _email,
        uint256 _mobile,
        string memory _avatar
    ) {
        admin.userAddress = msg.sender;
        admin.name = _name;
        admin.email = _email;
        admin.mobile = _mobile;
        admin.avatar = _avatar;
        admin.role = "admin";
        admin.team = "Management";
        admin.isAdmin = true;
    }

    modifier onlyAdmin() {
        require(
            msg.sender == admin.userAddress,
            "Only admin can call this function"
        );
        _;
    }

    function changeAdmin(
        string memory _name,
        string memory _email,
        uint256 _mobile
    ) external onlyAdmin {
        require(
            msg.sender == admin.userAddress,
            "Only current admin can set new admin"
        );
        admin.name = _name;
        admin.email = _email;
        admin.mobile = _mobile;
    }

    function changeAdminavatar(string memory _avatar) external onlyAdmin {
        require(
            msg.sender == admin.userAddress,
            "Only current admin can set new avatar"
        );
        admin.avatar = _avatar;
    }

    function addUser(
        address _userAddress,
        string memory _name,
        string memory _email,
        bool _isAdmin,
        string memory _role,
        string memory _team
    ) external onlyAdmin {
        User storage user = users[_userAddress];
        user.userAddress = _userAddress;
        user.name = _name;
        user.email = _email;
        user.role = _role;
        user.team = _team;
        user.isAdmin = _isAdmin;
        usersAddresses.push(_userAddress);
    }

    function fetchUsersAddress()
        external
        view
        onlyAdmin
        returns (address[] memory)
    {
        return usersAddresses;
    }

    function searchUser(address _userAddress)
        external
        view
        returns (User memory)
    {
        User storage user = users[_userAddress];
        return user;
    }

    function removeUser(address _userAddress) external onlyAdmin {
        delete users[_userAddress];
    }

    function changeUsername(address _userAddress, string memory _name)
        external
    {
        User storage user = users[_userAddress];

        require(
            user.userAddress == msg.sender || msg.sender == admin.userAddress,
            "Only owner and can change username"
        );

        require(
            bytes(_name).length <= 32 && bytes(_name).length > 0,
            "Username should have minimum 1 and maximum 32 charactor"
        );

        user.name = _name;
    }

    function changeUseremail(address _userAddress, string memory _email)
        external
    {
        User storage user = users[_userAddress];

        require(
            user.userAddress == msg.sender || msg.sender == admin.userAddress,
            "Only owner can change username"
        );

        require(
            bytes(_email).length <= 32 && bytes(_email).length > 0,
            "Email should be a valid email address"
        );

        user.email = _email;
    }

    function changeUseravatar(address _userAddress, string memory _avatar)
        external
    {
        User storage user = users[_userAddress];

        require(
            user.userAddress == msg.sender || msg.sender == admin.userAddress,
            "Only owner can change username"
        );

        require(
            bytes(_avatar).length <= 32 && bytes(_avatar).length > 0,
            "Your avatar isn't in a valid format"
        );

        user.avatar = _avatar;
    }

    function changeUsermobile(address _userAddress, uint256 _mobile) external {
        User storage user = users[_userAddress];

        require(
            user.userAddress == msg.sender || msg.sender == admin.userAddress,
            "Only owner can change username"
        );
        require(_mobile == 10, "Mobile number should be a valid mobile number");

        user.mobile = _mobile;
    }

    function changeUserrole(address _userAddress, string memory _role)
        external
        onlyAdmin
    {
        User storage user = users[_userAddress];

        user.role = _role;
    }

    function changeUserteam(address _userAddress, string memory _team)
        external
        onlyAdmin
    {
        User storage user = users[_userAddress];

        user.team = _team;
    }

    function checkIn(address _userAddress) external {
        User storage user = users[_userAddress];
        user.checkIn.push(block.timestamp);
    }

    function checkOut(address _userAddress) external {
        User storage user = users[_userAddress];
        user.checkOut.push(block.timestamp);
    }

    function assignTask(
        address _userAddress,
        string memory _taskName,
        string memory _taskDescription
    ) external onlyAdmin {
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

    function comleteTask(address _userAddress, uint256 _taskId)
        external
        onlyAdmin
    {
        User storage user = users[_userAddress];
        user.tasks[_taskId].taskStatus = "completed";
    }
}
