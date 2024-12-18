// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/proxy/utils/Initializable.sol";

interface IKYAgentRegistry {
    function isAgentVerified(uint256 agentId) external view returns (bool);
    function getAgentController(
        uint256 agentId
    ) external view returns (address);
}

contract AgentRegistry is Ownable, ReentrancyGuard, Initializable {
    using Counters for Counters.Counter;

    struct Agent {
        string name;
        address controller;
        string apiEndpoint;
        string[] capabilities;
        bool isVerified;
        uint256 registrationTime;
    }

    Counters.Counter private _agentIds;
    mapping(uint256 => Agent) public agents;
    mapping(address => uint256[]) public controllerToAgents;

    event AgentRegistered(uint256 indexed agentId, address indexed controller);
    event AgentVerified(uint256 indexed agentId);
    event AgentUpdated(uint256 indexed agentId);

    constructor() Ownable(msg.sender) {}

    function registerAgent(
        string memory name,
        string memory apiEndpoint,
        string[] memory capabilities
    ) external nonReentrant returns (uint256) {
        _agentIds.increment();
        uint256 newAgentId = _agentIds.current();

        agents[newAgentId] = Agent({
            name: name,
            controller: msg.sender,
            apiEndpoint: apiEndpoint,
            capabilities: capabilities,
            isVerified: false,
            registrationTime: block.timestamp
        });

        controllerToAgents[msg.sender].push(newAgentId);

        emit AgentRegistered(newAgentId, msg.sender);
        return newAgentId;
    }

    function verifyAgent(uint256 agentId) external onlyOwner {
        require(
            agents[agentId].controller != address(0),
            "Agent does not exist"
        );
        require(!agents[agentId].isVerified, "Agent already verified");

        agents[agentId].isVerified = true;
        emit AgentVerified(agentId);
    }

    function updateAgentEndpoint(
        uint256 agentId,
        string memory newEndpoint
    ) external {
        require(
            agents[agentId].controller == msg.sender,
            "Not agent controller"
        );
        agents[agentId].apiEndpoint = newEndpoint;
        emit AgentUpdated(agentId);
    }

    function isAgentVerified(uint256 agentId) external view returns (bool) {
        return agents[agentId].isVerified;
    }

    function getAgentController(
        uint256 agentId
    ) external view returns (address) {
        return agents[agentId].controller;
    }
}
