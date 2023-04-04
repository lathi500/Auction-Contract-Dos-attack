// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  
  const Auction = await ethers.getContractFactory("Auction");
  const auction = await Auction.deploy();
  await auction.deployed();

  console.log("Auction smart contract deployed at: ", auction.address);

  const Attack = await ethers.getContractFactory("Attack");
  attack = await Attack.deploy();
  await attack.deployed();

  console.log("Auction smartc contract deployed at: ", attack.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
