import "@nomicfoundation/hardhat-foundry";

import "@solarity/hardhat-migrate";

import "tsconfig-paths/register";

import { HardhatUserConfig } from "hardhat/config";

import * as dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
  networks: {
    qtumTestnet: {
      url: `https://testnet.qnode.qtum.info/v1/${process.env.QTUM_API_KEY}`,
    },
  },
  etherscan: {
    apiKey: {},
    customChains: [],
  },
  solidity: {
    version: "0.6.12",
    settings: {
      optimizer: {
        enabled: true,
        runs: 10000000,
      },
      evmVersion: "istanbul",
    },
  },
  migrate: {
    pathToMigrations: "./deploy/",
  },
};

export default config;
