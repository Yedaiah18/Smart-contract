// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Donut {
 mapping(address => uint) public balances;
    uint public price = 1 ether;
    uint public price2 = 5 ether;
    function buy() payable public {
        require(msg.value == price, "Incorrect payment amount.");
        balances[msg.sender] += 1;
    }
    function buy2() payable public {
        require(msg.value == price2, "Incorrect payment amount.");
        balances[msg.sender] += 5;
    }
}
