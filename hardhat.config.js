
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require('dotenv').config({path: '.env'});



task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners();
  
    for (const account of accounts) {
      console.log(account.address);
    }
  });


module.exports = {
    solidity: "0.8.4",
    defaultNetwork: "testnet",
    networks: {
      hardhat: {},
      testnet: {
        url: "https://eth.bd.evmos.dev:8545",
        accounts: [process.env.PRIVATE_KEY.toString()]
      }
    }
  };
 