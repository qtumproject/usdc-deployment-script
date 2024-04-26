export interface DeploymentConfig {
  proxyAdminAddress: string;
  ownerAddress: string;
  pauserAddress: string;
  blacklisterAddress: string;
  lostAndFoundAddress: string;
  masterMinterOwnerAddress: string;
  tokenName: string;
  tokenSymbol: string;
  tokenCurrency: string;
  tokenDecimals: number;
}
