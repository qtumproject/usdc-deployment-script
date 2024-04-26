import fs from "fs";

import { DeploymentConfig } from "@types";

export function parseConfig(configPath: string = "deploy/config/config.json"): DeploymentConfig {
  if (!fs.existsSync(configPath)) {
    throw new Error(`Configuration file not found at path: ${configPath}`);
  }

  const config: DeploymentConfig = JSON.parse(fs.readFileSync(configPath, "utf-8")) as DeploymentConfig;

  validateConfig(config);

  return config;
}

function validateConfig(config: DeploymentConfig) {
  // Define the type for the keys of DeploymentConfig
  type ConfigKeys = keyof DeploymentConfig;

  // List of required fields
  const requiredFields: ConfigKeys[] = [
    "proxyAdminAddress",
    "ownerAddress",
    "masterMinterOwnerAddress",
    "tokenName",
    "tokenSymbol",
    "tokenCurrency",
  ];

  // Validate required fields
  requiredFields.forEach((field) => {
    if (!config[field] || config[field] === "") {
      throw new Error(`${field} is required in the config`);
    }
  });

  if (config.tokenDecimals <= 0) {
    throw new Error(`tokenDecimals must be a non-negative number`);
  }

  // Network dependent fields
  validateNetworkDependentField(config, "pauserAddress");
  validateNetworkDependentField(config, "blacklisterAddress");
  validateNetworkDependentField(config, "lostAndFoundAddress");
}

function validateNetworkDependentField(config: DeploymentConfig, fieldName: keyof DeploymentConfig) {
  if (!config[fieldName] || config[fieldName] === "") {
    if (isAddressField(fieldName)) {
      config[fieldName] = config.ownerAddress; // Default to ownerAddress if not on mainnet
    }
  }
}

function isAddressField(
  field: keyof DeploymentConfig,
): field is "pauserAddress" | "blacklisterAddress" | "lostAndFoundAddress" {
  return ["pauserAddress", "blacklisterAddress", "lostAndFoundAddress"].includes(field);
}
