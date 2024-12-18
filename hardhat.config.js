require("@hashgraph/hardhat-hethers");

module.exports = {
  solidity: "0.8.19",
  networks: {
    testnet: {
      url: "https://testnet.hedera.com",
      accounts: [process.env.NEXT_PUBLIC_HEDERA_OPERATOR_KEY],
    },
  },
};
