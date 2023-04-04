const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");


describe("Auction Smart Contract", function () {

  let owner, otherAccount, user1, user2, user3, user4;
  let auction, attack;
  // let user1Amount,user1Amount;
  before(async () => {

    [owner, otherAccount, user1, user2, user3, user4] = await ethers.getSigners();
    const Auction = await ethers.getContractFactory("Auction");
    auction = await Auction.deploy();
    await auction.deployed();

    console.log("Auction smart contract deployed at: ", auction.address);

    const Attack = await ethers.getContractFactory("Attack");
    attack = await Attack.deploy();
    await attack.deployed();

    console.log("Auction smartc contract deployed at: ", attack.address);

  })


  describe("Auction Contract Working Flow", function () {
    it("Should Become a new leader", async function () {

      const tx = await auction.connect(user1).bid({ value: BigInt(2000000000000000000).toString() })

      expect(await auction.currentLeader()).to.equal(user1.address);
      console.log(await auction.currentLeader());
      expect(await auction.highestBid()).to.equal((BigInt(2000000000000000000).toString()).toString());
    });

    it("Should fail to become new leader with amount less than previous leader", async function () {
      await expect(auction.connect(user2).bid({ value: BigInt(1000000000000000000).toString() })).to.be.revertedWith("can not bid with amount less than previous leader");
    });

    it("Should Become leader with greater amount then previous leader", async function () {
      const tx = await auction.connect(user2).bid({ value: BigInt(3000000000000000000).toString() })

      expect(await auction.currentLeader()).to.equal(user2.address);
      expect(await auction.highestBid()).to.equal((BigInt(3000000000000000000).toString()).toString());
    });
  });

  describe("Attack Smart Contract", function () {
    describe("Attack on auction smart contract", function () {
      it("Attacked", async function () {
        const tx = await attack.connect(user3).attack(auction.address, { value: BigInt(4000000000000000000).toString() })
        expect(await auction.currentLeader()).to.equal(attack.address);
        expect(await auction.highestBid()).to.equal((BigInt(4000000000000000000).toString()).toString());
      });

      it('Fail to become new leader after attack on Auction contract', async () => {
        await expect(auction.connect(user4).bid({ value: BigInt(5000000000000000000).toString() })).to.be.reverted;
      })
    });
  });
});
