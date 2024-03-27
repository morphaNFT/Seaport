require("@nomiclabs/hardhat-waffle");

const config = require("./config.json")

/** @type import('hardhat/config').HardhatUserConfig */

module.exports = {
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/a79783854b0f446a8a74e513996a58d7`,
      accounts: [`0x${config.common.privateKey}`,`0x${config.common.privateKey_92Fa}`, `0x${config.common.privateKey_19a2}`],
      gas: 6000000
    },
    morph: {
      url: `https://rpc-testnet.morphl2.io`,
      accounts: [`0x${config.common.privateKey}`,`0x${config.common.privateKey_92Fa}`, `0x${config.common.privateKey_19a2}`],
      gas: 6000000
    },
  },
  solidity: {
    compilers: [
      {
        version: "0.8.17",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      }
    ]
  },
  paths: {
    //sources: "./erc721"
  }
};

