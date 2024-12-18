// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./AgentRegistry.sol";

contract TaskManager is Ownable, ReentrancyGuard {
    using Counters for Counters.Counter;

    struct Task {
        uint256 agentId;
        address requester;
        string input;
        string output;
        bool isVerified;
        uint256 timestamp;
        TaskStatus status;
    }

    enum TaskStatus {
        Pending,
        Completed,
        Failed
    }

    Counters.Counter private _taskIds;
    mapping(uint256 => Task) public tasks;
    mapping(uint256 => uint256[]) public agentTasks;

    IKYAgentRegistry public registry;

    event TaskCreated(uint256 indexed taskId, uint256 indexed agentId);
    event TaskCompleted(uint256 indexed taskId);
    event TaskFailed(uint256 indexed taskId);
    event TaskVerified(uint256 indexed taskId);

    constructor(address _registry) Ownable(msg.sender) {
        registry = IKYAgentRegistry(_registry);
    }

    function createTask(
        uint256 agentId,
        string memory input
    ) external nonReentrant returns (uint256) {
        require(registry.isAgentVerified(agentId), "Agent not verified");

        _taskIds.increment();
        uint256 newTaskId = _taskIds.current();

        tasks[newTaskId] = Task({
            agentId: agentId,
            requester: msg.sender,
            input: input,
            output: "",
            isVerified: false,
            timestamp: block.timestamp,
            status: TaskStatus.Pending
        });

        agentTasks[agentId].push(newTaskId);

        emit TaskCreated(newTaskId, agentId);
        return newTaskId;
    }

    function completeTask(uint256 taskId, string memory output) external {
        Task storage task = tasks[taskId];
        require(task.timestamp != 0, "Task does not exist");
        require(
            registry.getAgentController(task.agentId) == msg.sender,
            "Not agent controller"
        );

        task.output = output;
        task.status = TaskStatus.Completed;
        emit TaskCompleted(taskId);
    }

    function verifyTask(uint256 taskId) external onlyOwner {
        require(tasks[taskId].timestamp != 0, "Task does not exist");
        require(!tasks[taskId].isVerified, "Task already verified");

        tasks[taskId].isVerified = true;
        emit TaskVerified(taskId);
    }
}
