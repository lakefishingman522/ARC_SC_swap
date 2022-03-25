const { ethers, network } = require("hardhat");
const { constants, utils } = require("ethers");

describe("DepoRouter contract test:", () => {
  // contract
  let depoRouterFactory;
  let depoRouter;
  let depoERC20;

  // accounts
  let owner;
  let account1;
  let treasury;
  let deployAccount;


  beforeEach(async () => {
    let deployerAddress = "0xcd10a2F7ee8Fd35356F4e3e6A237F543bc20C0e4";
    [owner, account1, treasury] = await ethers.getSigners();

    // prepare impersonate Account
    await network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [deployerAddress],
    });
    deployAccount = await ethers.provider.getSigner(deployerAddress)

    // send 100 ether to DeployAccount contract
    await account1.sendTransaction({
      from: account1.address,
      to: deployerAddress,
      value: utils.parseEther("100"),
    });

    // DepoRouter Contract prepare
    depoRouterFactory = await ethers.getContractFactory("DepoRouter");
    depoRouter = await depoRouterFactory.deploy();

    // set Treasury
    await depoRouter.connect(owner).setTreasury(treasury.address);

    // prepare Depo token contract
    const depoAddress = "0xa5DEf515cFd373D17830E7c1de1639cB3530a112";
    depoERC20 = await ethers.getContractAt("IDepoToken", depoAddress);
  });



  describe("unoswap function test", () => {
    it("should be succeeded from ETH to DEPO", async () => {
      const target = depoRouter.address
      const callData = "0x2e95b6c8000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000038d7ea4c680000000000000000000000000000000000000000000000000021572c97c2516eb8a0000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000180000000000000003b6d0340ae8b9d75a75a8b7c5cc5deb51fa916ac49147dadcfee7c08";
      const nonce = await deployAccount.getTransactionCount()

      const tx = {
        from: await deployAccount.getAddress(),
        to: target,
        // value: "0x38d7ea4c68000",
        value: "0x3E871B540C000",
        nonce: ethers.utils.hexlify(nonce),
        gasLimit: "0x31423",
        gasPrice: "0x11f48b8889",
        data: callData
      };

      const treasuryBalanceBefore = await treasury.getBalance();
      const depoBalanceBefore = utils.formatEther(
        await depoERC20.balanceOf(deployAccount.getAddress())
      );
      await deployAccount.sendTransaction(
        tx
      )
      const treasuryBalanceAfter = await treasury.getBalance();
      const depoBalanceAfter = utils.formatEther(
        await depoERC20.balanceOf(deployAccount.getAddress())
      );
    });

    it("should be succeeded from DEPO to ETH", async () => {
      const target = depoRouter.address
      const callData = "0x2e95b6c8000000000000000000000000a5def515cfd373d17830e7c1de1639cb3530a11200000000000000000000000000000000000000000000000ad78ebc5ac6200000000000000000000000000000000000000000000000000000000db3164bc83c920000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000140000000000000003b6d0340ae8b9d75a75a8b7c5cc5deb51fa916ac49147dadcfee7c08";
      const nonce = await deployAccount.getTransactionCount()

      const tx = {
        from: await deployAccount.getAddress(),
        to: target,
        value: "0x3E871B540C000",
        nonce: ethers.utils.hexlify(nonce),
        gasLimit: "0x25a26",
        gasPrice: "0xfe2c08c81",
        data: callData
      };

      await depoERC20.connect(deployAccount).approve(target, constants.MaxUint256)


      const treasuryBalanceBefore = await treasury.getBalance();
      const depoBalanceBefore = utils.formatEther(
        await depoERC20.balanceOf(deployAccount.getAddress())
      );

      await deployAccount.sendTransaction(
        tx
      )
      const treasuryBalanceAfter = await treasury.getBalance();
      const depoBalanceAFter = utils.formatEther(
        await depoERC20.balanceOf(deployAccount.getAddress())
      );
    });
  });
});
