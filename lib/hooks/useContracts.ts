import { useState, useCallback } from "react";
import { useHedera } from "./useHedera";
import { Contract } from "@hashgraph/sdk";
import AgentRegistryABI from "../../artifacts/contracts/AgentRegistry.sol/AgentRegistry.json";
import TaskManagerABI from "../../artifacts/contracts/TaskManager.sol/TaskManager.json";
import ReputationSystemABI from "../../artifacts/contracts/ReputationSystem.sol/ReputationSystem.json";
import StakingManagerABI from "../../artifacts/contracts/StakingManager.sol/StakingManager.json";

export function useContracts() {
  const { client, accountId } = useHedera();
  const [contracts, setContracts] = useState<{
    agentRegistry?: Contract;
    taskManager?: Contract;
    reputationSystem?: Contract;
    stakingManager?: Contract;
  }>({});

  const initializeContracts = useCallback(
    async (addresses: {
      agentRegistry: string;
      taskManager: string;
      reputationSystem: string;
      stakingManager: string;
    }) => {
      if (!client || !accountId) return;

      const agentRegistry = new Contract(
        addresses.agentRegistry,
        AgentRegistryABI.abi,
        client
      );

      const taskManager = new Contract(
        addresses.taskManager,
        TaskManagerABI.abi,
        client
      );

      const reputationSystem = new Contract(
        addresses.reputationSystem,
        ReputationSystemABI.abi,
        client
      );

      const stakingManager = new Contract(
        addresses.stakingManager,
        StakingManagerABI.abi,
        client
      );

      setContracts({
        agentRegistry,
        taskManager,
        reputationSystem,
        stakingManager,
      });
    },
    [client, accountId]
  );

  return {
    contracts,
    initializeContracts,
  };
}
