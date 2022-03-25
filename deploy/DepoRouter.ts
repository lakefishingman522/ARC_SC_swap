import hre from "hardhat";
import "@nomiclabs/hardhat-ethers";
import { Logger } from "tslog";
import { verify } from "../utils";
import { wait } from '../utils/time'

const log: Logger = new Logger();
const contractName = "DepoRouter";

async function deploy() {
    log.info(`Deploying "${contractName}" on network: ${hre.network.name}`);

    const deployContract = await hre.ethers.getContractFactory(contractName);
    const deployContractInstance = await deployContract.deploy();

    await deployContractInstance.deployed();
    const deployContractAddress = deployContractInstance.address;
    log.info(
        `"${contractName}" was successfully deployed on network: ${hre.network.name}, address: ${deployContractAddress}`
    );
    return { deployedAddr: deployContractAddress };
}

async function main() {
    const { deployedAddr } = await deploy();
    await wait(10000);
    await verify({
        contractName,
        address: deployedAddr,
        constructorArguments: [],
        contractPath: "contracts/DepoRouter.sol:DepoRouter",
    });
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
