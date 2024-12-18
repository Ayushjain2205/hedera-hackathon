import { Client, AccountId } from "@hashgraph/sdk";

// Using testnet for development
const client = Client.forTestnet();

// You'll need to replace these with your testnet credentials
const operatorId = AccountId.fromString(
  process.env.NEXT_PUBLIC_HEDERA_OPERATOR_ID!
);
const operatorKey = process.env.NEXT_PUBLIC_HEDERA_OPERATOR_KEY!;

client.setOperator(operatorId, operatorKey);

export { client };
