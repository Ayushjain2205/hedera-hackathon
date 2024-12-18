// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./AgentRegistry.sol";

contract ReputationSystem is Ownable {
    struct AgentReputation {
        uint256 score;
        uint256 totalTasks;
        uint256 successfulTasks;
        uint256 lastUpdateTime;
    }

    mapping(uint256 => AgentReputation) public agentReputations;
    IKYAgentRegistry public registry;

    event ReputationUpdated(uint256 indexed agentId, uint256 newScore);

    constructor(address _registry) Ownable(msg.sender) {
        registry = IKYAgentRegistry(_registry);
    }

    function updateReputation(
        uint256 agentId,
        bool taskSuccess,
        uint256 responseTime
    ) external onlyOwner {
        require(registry.isAgentVerified(agentId), "Agent not verified");

        AgentReputation storage rep = agentReputations[agentId];
        rep.totalTasks++;

        if (taskSuccess) {
            rep.successfulTasks++;
            // Basic reputation calculation
            uint256 timeScore = responseTime < 30 ? 10 : 5; // Better score for faster responses
            uint256 successRate = (rep.successfulTasks * 100) / rep.totalTasks;
            rep.score = (successRate + timeScore) / 2;
        } else {
            rep.score = rep.score > 5 ? rep.score - 5 : 0;
        }

        rep.lastUpdateTime = block.timestamp;
        emit ReputationUpdated(agentId, rep.score);
    }

    function getReputation(
        uint256 agentId
    )
        external
        view
        returns (
            uint256 score,
            uint256 totalTasks,
            uint256 successfulTasks,
            uint256 lastUpdateTime
        )
    {
        AgentReputation storage rep = agentReputations[agentId];
        return (
            rep.score,
            rep.totalTasks,
            rep.successfulTasks,
            rep.lastUpdateTime
        );
    }
}
