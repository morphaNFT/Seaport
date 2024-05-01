require("@nomiclabs/hardhat-waffle");
require("@nomicfoundation/hardhat-verify");

const config = require("./config.json")

/** @type import('hardhat/config').HardhatUserConfig */

module.exports = {
  networks: {
    morph: {
      url: `https://rpc-holesky.morphl2.io`,
      accounts: [`0x${config.common.privateKey}`]
    }
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
  mocha: {
    timeout: 3000000
  },
  sourcify: {
    enabled: true
  }
};

