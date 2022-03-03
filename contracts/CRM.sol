//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Counters.sol";

contract CRM {
    using Counters for Counters.Counter;
    Counters.Counter private _userCount;

    struct User {
        uint256 userId;
        address userAddress;
        string name;
        string email;
        string role;
        bool isAdmin;
        uint256[] checkIn;
        uint256[] checkOut;
    }

    User public admin;

    mapping(uint256 => User) public users;

    constructor(string memory _name, string memory _email) {
        admin.userId = 0;
        admin.userAddress = msg.sender;
        admin.name = _name;
        admin.email = _email;
        admin.role = "admin";
        admin.isAdmin = true;
    }

    modifier onlyAdmin() {
        require(
            msg.sender == admin.userAddress,
            "Only admin can call this function"
        );
        _;
    }

    function addUser(
        string memory _name,
        string memory _email,
        bool _isAdmin,
        string memory _role
    ) external onlyAdmin {
        _userCount.increment();
        User storage user = users[_userCount.current()];
        user.userId = _userCount.current();
        user.userAddress = msg.sender;
        user.name = _name;
        user.email = _email;
        user.isAdmin = _isAdmin;
        user.role = _role;
    }

    function fetchUsers() external view returns (User[] memory) {
        uint256 itemCount = _userCount.current();
        uint256 currentIndex = 0;

        User[] memory result = new User[](itemCount);

        for (uint256 i = itemCount; i > 0; i--) {
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

    function checkIn(uint256 _userId) external {
        User storage user = users[_userId];
        user.checkIn.push(block.timestamp);
    }

    function checkOut(uint256 _userId) external {
        User storage user = users[_userId];
        user.checkOut.push(block.timestamp);
    }
}
