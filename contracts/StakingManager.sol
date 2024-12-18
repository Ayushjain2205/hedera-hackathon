// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./AgentRegistry.sol";

contract StakingManager is Ownable, ReentrancyGuard {
    struct Stake {
        uint256 amount;
        uint256 timestamp;
        bool isActive;
    }

    mapping(uint256 => Stake) public agentStakes;
    IKYAgentRegistry public registry;
    uint256 public minimumStake;

    event StakeDeposited(uint256 indexed agentId, uint256 amount);
    event StakeWithdrawn(uint256 indexed agentId, uint256 amount);
    event MinimumStakeUpdated(uint256 newAmount);

    constructor(address _registry, uint256 _minimumStake) Ownable(msg.sender) {
        registry = IKYAgentRegistry(_registry);
        minimumStake = _minimumStake;
    }

    function depositStake(uint256 agentId) external payable nonReentrant {
        require(
            registry.getAgentController(agentId) == msg.sender,
            "Not agent controller"
        );
        require(msg.value >= minimumStake, "Insufficient stake amount");

        Stake storage stake = agentStakes[agentId];
        stake.amount += msg.value;
        stake.timestamp = block.timestamp;
        stake.isActive = true;

        emit StakeDeposited(agentId, msg.value);
    }

    function withdrawStake(uint256 agentId) external nonReentrant {
        require(
            registry.getAgentController(agentId) == msg.sender,
            "Not agent controller"
        );
        Stake storage stake = agentStakes[agentId];
        require(stake.isActive, "No active stake");

        uint256 amount = stake.amount;
        stake.amount = 0;
        stake.isActive = false;

        (bool success, ) = payable(msg.sender).call{value: amount}("");
        require(success, "Transfer failed");

        emit StakeWithdrawn(agentId, amount);
    }

    function updateMinimumStake(uint256 newAmount) external onlyOwner {
        minimumStake = newAmount;
        emit MinimumStakeUpdated(newAmount);
    }
}
