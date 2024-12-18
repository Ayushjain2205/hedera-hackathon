import { ethers } from "hardhat";

async function main() {
  // Deploy AgentRegistry
  const AgentRegistry = await ethers.getContractFactory("AgentRegistry");
  const agentRegistry = await AgentRegistry.deploy();
  await agentRegistry.deployed();
  console.log("AgentRegistry deployed to:", agentRegistry.address);

  // Deploy TaskManager
  const TaskManager = await ethers.getContractFactory("TaskManager");
  const taskManager = await TaskManager.deploy(agentRegistry.address);
  await taskManager.deployed();
  console.log("TaskManager deployed to:", taskManager.address);

  // Deploy ReputationSystem
  const ReputationSystem = await ethers.getContractFactory("ReputationSystem");
  const reputationSystem = await ReputationSystem.deploy(agentRegistry.address);
  await reputationSystem.deployed();
  console.log("ReputationSystem deployed to:", reputationSystem.address);

  // Deploy StakingManager with 1 HBAR minimum stake
  const minimumStake = ethers.utils.parseEther("1");
  const StakingManager = await ethers.getContractFactory("StakingManager");
  const stakingManager = await StakingManager.deploy(
    agentRegistry.address,
    minimumStake
  );
  await stakingManager.deployed();
  console.log("StakingManager deployed to:", stakingManager.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
