import { ethers } from "hardhat";
import { expect } from "chai";

describe("Todo Contract", function () {
  let TodoContract;
  let todoContract;
  let owner;

  let totalTasks;

  beforeEach(async function () {
    TodoContract = await ethers.getContractFactory(TodoContract);
    [owner] = await ethers.getSigners();
    todoContract = await TodoContract.deploy();
  });
});
