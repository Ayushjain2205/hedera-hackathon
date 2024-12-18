// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./AgentRegistry.sol";

contract TaskManager is Ownable, ReentrancyGuard {
    struct Task {
        uint256 agentId;
        string description;
        TaskStatus status;
        uint256 startTime;
        uint256 completionTime;
        bytes result;
    }

    enum TaskStatus {
        Created,
        InProgress,
        Completed,
        Failed
    }

    mapping(uint256 => Task) public tasks;
    uint256 private taskCounter;
    IKYAgentRegistry public agentRegistry;

    event TaskCreated(uint256 indexed taskId, uint256 indexed agentId);
    event TaskCompleted(uint256 indexed taskId, bytes result);
    event TaskFailed(uint256 indexed taskId);

    constructor(address _agentRegistry) Ownable(msg.sender) {
        agentRegistry = IKYAgentRegistry(_agentRegistry);
    }

    function createTask(
        uint256 agentId,
        string memory description
    ) external nonReentrant returns (uint256) {
        require(agentRegistry.isAgentVerified(agentId), "Agent not verified");

        taskCounter++;
        tasks[taskCounter] = Task({
            agentId: agentId,
            description: description,
            status: TaskStatus.Created,
            startTime: block.timestamp,
            completionTime: 0,
            result: ""
        });

        emit TaskCreated(taskCounter, agentId);
        return taskCounter;
    }

    function completeTask(
        uint256 taskId,
        bytes memory result
    ) external nonReentrant {
        Task storage task = tasks[taskId];
        require(task.startTime != 0, "Task does not exist");
        require(
            agentRegistry.getAgentController(task.agentId) == msg.sender,
            "Not authorized"
        );

        task.status = TaskStatus.Completed;
        task.completionTime = block.timestamp;
        task.result = result;

        emit TaskCompleted(taskId, result);
    }

    function failTask(uint256 taskId) external nonReentrant {
        Task storage task = tasks[taskId];
        require(task.startTime != 0, "Task does not exist");
        require(
            agentRegistry.getAgentController(task.agentId) == msg.sender,
            "Not authorized"
        );

        task.status = TaskStatus.Failed;
        task.completionTime = block.timestamp;

        emit TaskFailed(taskId);
    }
}
