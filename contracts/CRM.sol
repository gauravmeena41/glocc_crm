//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Counters.sol";

contract CRM {
    using Counters for Counters.Counter;
    Counters.Counter private _userCount;

    string[] private teams = [
        "Commerce-cloud",
        "Marketing-cloud",
        "Velocity-cloud",
        "Health-cloud"
    ];

    struct User {
        uint256 userId;
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
    }

    User public admin;

    mapping(uint256 => User) public users;

    constructor(
        string memory _name,
        string memory _email,
        uint256 _mobile,
        string memory _avatar
    ) {
        admin.userId = 0;
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
        string memory _name,
        string memory _email,
        bool _isAdmin,
        string memory _role,
        string memory _team
    ) external onlyAdmin {
        _userCount.increment();
        User storage user = users[_userCount.current()];
        user.userId = _userCount.current();
        user.userAddress = msg.sender;
        user.name = _name;
        user.email = _email;
        user.role = _role;
        user.team = _team;
        user.isAdmin = _isAdmin;
    }

    function fetchUsers() external view returns (User[] memory) {
        uint256 userCount = _userCount.current();
        uint256 currentIndex = 0;

        User[] memory result = new User[](userCount);

        for (uint256 i = userCount; i > 0; i--) {
            User storage currentItem = users[i];
            result[currentIndex] = currentItem;
            currentIndex++;
        }
        return result.length > 0 ? result : new User[](0);
    }

    function searchUser(uint256 _userId) external view returns (User memory) {
        User storage user = users[_userId];
        return user;
    }

    function removeUser(uint256 _userId) external onlyAdmin {
        delete users[_userId];
    }

    function changeUsername(uint256 _userId, string memory _name) external {
        User storage user = users[_userId];

        require(
            user.userAddress == msg.sender || user.isAdmin,
            "Only owner can change username"
        );

        require(
            bytes(_name).length <= 32 && bytes(_name).length > 0,
            "Username should have minimum 1 and maximum 32 charactor"
        );

        user.name = _name;
    }

    function changeUseremail(uint256 _userId, string memory _email) external {
        User storage user = users[_userId];

        require(
            user.userAddress == msg.sender || user.isAdmin,
            "Only owner can change username"
        );

        require(
            bytes(_email).length <= 32 && bytes(_email).length > 0,
            "Email should be a valid email address"
        );

        user.email = _email;
    }

    function changeUseravatar(uint256 _userId, string memory _avatar) external {
        User storage user = users[_userId];

        require(
            user.userAddress == msg.sender || user.isAdmin,
            "Only owner can change username"
        );

        require(
            bytes(_avatar).length <= 32 && bytes(_avatar).length > 0,
            "Your avatar isn't in a valid format"
        );

        user.avatar = _avatar;
    }

    function changeUsermobile(uint256 _userId, uint256 _mobile) external {
        User storage user = users[_userId];

        require(
            user.userAddress == msg.sender || user.isAdmin,
            "Only owner can change username"
        );
        require(_mobile == 10, "Mobile number should be a valid mobile number");

        user.mobile = _mobile;
    }

    function changeUserrole(uint256 _userId, string memory _role) external {
        User storage user = users[_userId];

        require(
            user.userAddress == msg.sender || user.isAdmin,
            "Only owner can change username"
        );

        user.role = _role;
    }

    function changeUserteam(uint256 _userId, string memory _team) external {
        User storage user = users[_userId];

        require(
            user.userAddress == msg.sender || user.isAdmin,
            "Only owner can change username"
        );

        user.team = _team;
    }

    function checkIn(uint256 _userId) external {
        User storage user = users[_userId];
        user.checkIn.push(block.timestamp);
    }

    function checkOut(uint256 _userId) external {
        User storage user = users[_userId];
        user.checkOut.push(block.timestamp);
    }
}
