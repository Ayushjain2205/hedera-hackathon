// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./AgentRegistry.sol";

contract ReputationSystem is Ownable {
    struct AgentReputation {
        uint256 totalTasks;
        uint256 successfulTasks;
        uint256 reputationScore;
        mapping(address => bool) userFeedback;
    }

    mapping(uint256 => AgentReputation) public agentReputations;
    IKYAgentRegistry public agentRegistry;

    event ReputationUpdated(uint256 indexed agentId, uint256 newScore);
    event FeedbackSubmitted(
        uint256 indexed agentId,
        address indexed user,
        bool positive
    );

    constructor(address _agentRegistry) Ownable(msg.sender) {
        agentRegistry = IKYAgentRegistry(_agentRegistry);
    }

    function submitTaskResult(
        uint256 agentId,
        bool successful
    ) external onlyOwner {
        AgentReputation storage rep = agentReputations[agentId];
        rep.totalTasks++;
        if (successful) {
            rep.successfulTasks++;
        }
        _updateReputationScore(agentId);
    }

    function submitFeedback(uint256 agentId, bool positive) external {
        require(agentRegistry.isAgentVerified(agentId), "Agent not verified");
        AgentReputation storage rep = agentReputations[agentId];
        require(!rep.userFeedback[msg.sender], "Feedback already submitted");

        rep.userFeedback[msg.sender] = true;
        if (positive) {
            rep.reputationScore += 1;
        } else {
            rep.reputationScore = rep.reputationScore > 0
                ? rep.reputationScore - 1
                : 0;
        }

        emit FeedbackSubmitted(agentId, msg.sender, positive);
        emit ReputationUpdated(agentId, rep.reputationScore);
    }

    function _updateReputationScore(uint256 agentId) private {
        AgentReputation storage rep = agentReputations[agentId];
        uint256 newScore = (rep.successfulTasks * 100) / rep.totalTasks;
        rep.reputationScore = newScore;
        emit ReputationUpdated(agentId, newScore);
    }
}
