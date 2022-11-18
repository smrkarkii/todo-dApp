const { ethers } = require("hardhat");

async function main() {
  const TodoContract = await ethers.getContractFactory("TodoContract");
  let todoContract = await TodoContract.deploy();
  console.log("deploying");
  await todoContract.deployed();
  let contractAddress = todoContract.address;
  console.log(`deployed at ${contractAddress}`);
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
