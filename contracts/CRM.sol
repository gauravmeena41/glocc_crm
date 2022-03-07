//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Counters.sol";

contract CRM {
    using Counters for Counters.Counter;
    Counters.Counter private _userCount;
    Counters.Counter private _taskCount;

    // Structs
    struct Oraganisation {
        string name;
        string website;
        string description;
        string logo;
        string[] departments;
    }

    struct User {
        uint256 userId;
        address userAddress;
        string name;
        string email;
        string avatar;
        uint256 mobile;
        string role;
        string team;
        string skills;
        // address reportingTo;
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

    User public CEO;
    // Higher Authorities
    // User public Administrator;
    // User public HR_Manager;
    // User public Training_Manager;
    // User public Finance_Manager;
    // User public Marketing_Manager;
    // User public Business_Development_Manager;
    // Higher Authorities

    // Mapppings
    mapping(address => User) public users;
    string[] departments;
    mapping(address => Oraganisation) public organizations;
    // Mapppings

    address[] private usersAddresses;

    constructor(
        string memory _name,
        string memory _email,
        uint256 _mobile,
        string memory _avatar,
        string memory _skills
    ) {
        CEO.userId = block.timestamp;
        CEO.userAddress = msg.sender;
        CEO.name = _name;
        CEO.email = _email;
        CEO.mobile = _mobile;
        CEO.avatar = _avatar;
        CEO.skills = _skills;
        CEO.role = "CEO";
        CEO.team = "Management";
    }

    modifier onlyCEO() {
        require(
            msg.sender == CEO.userAddress,
            "Only ceo have authority for this action."
        );
        _;
    }

    function addDepartment(string memory _department) external onlyCEO {
        departments.push(_department);
    }

    function fetchDepartments() external view returns (string[] memory) {
        return departments;
    }

    function changeCEO(
        string memory _name,
        string memory _email,
        uint256 _mobile
    ) external onlyCEO {
        require(
            msg.sender == CEO.userAddress,
            "Only current ceo can set new ceo"
        );
        CEO.name = _name;
        CEO.email = _email;
        CEO.mobile = _mobile;
        CEO.skills = "";
    }

    function changeCEOavatar(string memory _avatar) external onlyCEO {
        require(
            msg.sender == CEO.userAddress,
            "Only current ceo can set new avatar"
        );
        CEO.avatar = _avatar;
    }

    function addUser(
        address _userAddress,
        string memory _name,
        string memory _email,
        string memory _avatar,
        string memory _role,
        string memory _team
    ) external onlyCEO {
        User storage user = users[_userAddress];
        user.userId = block.timestamp;
        user.userAddress = _userAddress;
        user.name = _name;
        user.email = _email;
        user.avatar = _avatar;
        user.role = _role;
        user.team = _team;
        usersAddresses.push(_userAddress);
    }

    function fetchUsersAddress()
        external
        view
        onlyCEO
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

    function removeUser(address _userAddress) external onlyCEO {
        delete users[_userAddress];
    }

    function changeUsername(address _userAddress, string memory _name)
        external
    {
        User storage user = users[_userAddress];

        require(
            user.userAddress == msg.sender || msg.sender == CEO.userAddress,
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
            user.userAddress == msg.sender || msg.sender == CEO.userAddress,
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
            user.userAddress == msg.sender || msg.sender == CEO.userAddress,
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
            user.userAddress == msg.sender || msg.sender == CEO.userAddress,
            "Only owner can change username"
        );
        require(_mobile == 10, "Mobile number should be a valid mobile number");

        user.mobile = _mobile;
    }

    function changeUserrole(address _userAddress, string memory _role)
        external
        onlyCEO
    {
        User storage user = users[_userAddress];

        user.role = _role;
    }

    function changeUserteam(address _userAddress, string memory _team)
        external
        onlyCEO
    {
        User storage user = users[_userAddress];

        user.team = _team;
    }

    function changeUserskills(address _userAddress, string memory _skills)
        external
    {
        require(
            msg.sender == CEO.userAddress || _userAddress == msg.sender,
            "Only Owner and ceo can change skills"
        );
        require(bytes(_skills).length > 0, "Minimum one skill required");
        User storage user = users[_userAddress];

        user.skills = _skills;
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
    ) external onlyCEO {
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
        onlyCEO
    {
        User storage user = users[_userAddress];
        user.tasks[_taskId].taskStatus = "completed";
    }
}
