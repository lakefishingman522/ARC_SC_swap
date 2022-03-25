require("dotenv-extended").load();
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-etherscan";
import "@openzeppelin/hardhat-upgrades";
import "hardhat-contract-sizer";

if (!process.env.RINKEBY_PRIVKEY)
  throw new Error("RINKEBY_PRIVKEY missing from .env file");

const config = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      forking: {
        url: `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`,
        blockNumber: 14266150,

        // blockNumber: 11870289
      }
    },
    rinkeby: {
      chainId: 4,
      url: `https://rinkeby.infura.io/v3/${process.env.INFURA_RINKEBY_KEY}`,
      accounts: [process.env.RINKEBY_PRIVKEY],
    },
    mainnet: {
      chainId: 1,
      url: `https://mainnet.infura.io/v3/${process.env.INFURA_MAINNET_KEY}`,
      accounts: [process.env.RINKEBY_PRIVKEY],
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,

  },
  paths: {
    artifacts: "./artifacts",
    cache: "./cache",
    sources: "./contracts",
    tests: "./tests",
  },
  solidity: {
    compilers: [
      {
        version: "0.8.4",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.6.12",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  mocha: {
    timeout: 2000000000,
  },
  typechain: {
    outDir: "types/contracts",
    target: "truffle-v5",
  },
};

export default config;
