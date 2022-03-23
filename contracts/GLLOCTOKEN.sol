//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract GLLOCTOKEN is ERC20 {
    constructor() ERC20("GLLOCTOKEN", "GLC") {
        _mint(msg.sender, 10**18 * 10**18);
    }
}
