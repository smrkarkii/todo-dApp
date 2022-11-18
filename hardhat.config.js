require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",

  networks: {
    hardhat: {
      chainId: 1337,
    },
    goerli: {
      chainId: 5,
      url: "https://eth-goerli.g.alchemy.com/v2/bVJHHVtA7lWLkl5cCEgR1iU0LuRPSCzO",
      accounts: [
        "1f7b221d9f3ff1c1f82d2e71f1a0382442f8018b76cc0ca2cf5149f6140281bf",
      ],
    },
  },
};
