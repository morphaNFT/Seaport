require("@nomiclabs/hardhat-waffle");

const config = require("./config.json")

/** @type import('hardhat/config').HardhatUserConfig */

module.exports = {
  networks: {
    xsc_test: {
      url: `https://testnet1.xtvip.top`,
      accounts: [`0x${config.common.privateKey}`, `0x${config.common.privateKey_92Fa}`]
    },
    mumbai: {
      url: `https://polygontestapi.terminet.io/rpc`,
      accounts: [`0x${config.common.privateKey}`, `0x${config.common.privateKey_92Fa}`]
    },
    xsc_maint: {
      url: `https://datarpc3.xsc.pub`,
      accounts: [`0x${config.common.privateKey}`,`0x${config.common.privateKey_92Fa}`],
      gas: 2100000,
      // gasPrice: 8000000000,
    },
    goerli: {
      url: `https://goerli.infura.io/v3/a79783854b0f446a8a74e513996a58d7`,
      accounts: [`0x${config.common.privateKey}`,`0x${config.common.privateKey_92Fa}`]
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
  paths: {
    //sources: "./erc721"
  }
};

