import { mudConfig } from "@latticexyz/world/register";

export default mudConfig({
  tables: {
    Administrator: {
      keySchema: {},
      schema: "address",
    },
    Config: {
      keySchema: {},
      schema: {
        maxProjectId: "bytes32",
      },
    },
    Project: {
      schema: {
        owner: "address",
        fundToken: "address",
        fundTarget: "uint256",
        fundedSum: "uint256",
        // phase: "uint8",
        fundingPeriod: "uint256",
        withdrawalPeriod: "uint256",
      },
    },
    ProjectInfo: {
      schema: {
        name: "string",
        imageUri: "string",
        description: "string",
        uri: "string",
        demoUri: "string",
      },
      keySchema: {
        projectId: "bytes32",
      },
    },
    ProjectDonator: {
      schema: {
        amounts: "uint256[]",
        walletAddress: "address[]",
      },
    },

    Donator: {
      schema: {
        amounts: "uint256",
      },
      keySchema: {
        projectId: "bytes32",
        walletAddress: "address",
      },
    },
  },
  costants: {
    ETH_ADDRESS: "0x00",
  },
});
