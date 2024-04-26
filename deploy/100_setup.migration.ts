import { Reporter } from "@solarity/hardhat-migrate";

import {
  FiatTokenProxy__factory,
  FiatTokenV2_2__factory,
  MasterMinter__factory,
  SignatureChecker__factory,
} from "@ethers-v5";

import { getQTumContractAt, parseConfig, reportTransactionReceipt } from "@scripts";

export = async () => {
  const fiatTokenV2_2 = getQTumContractAt(FiatTokenV2_2__factory, "FiatTokenV2_2");
  const fiatTokenProxy = getQTumContractAt(FiatTokenProxy__factory, "FiatTokenProxy");
  const masterMinter = getQTumContractAt(MasterMinter__factory, "MasterMinter");

  const config = parseConfig();

  const transferOwnership = await masterMinter.transferOwnership(config.masterMinterOwnerAddress);
  await reportTransactionReceipt(await transferOwnership.wait(), "TransferOwnership MasterMinter");

  const changeAdmin = await fiatTokenProxy.changeAdmin(config.proxyAdminAddress);
  await reportTransactionReceipt(await changeAdmin.wait(), "ChangeAdmin FiatTokenProxy");

  const fiatTokenV2_2AtProxy = getQTumContractAt(FiatTokenV2_2__factory, "FiatTokenProxy");

  const initialize = await fiatTokenV2_2AtProxy.initialize(
    config.tokenName,
    config.tokenSymbol,
    config.tokenCurrency,
    config.tokenDecimals,
    masterMinter.address,
    config.pauserAddress,
    config.blacklisterAddress,
    config.ownerAddress,
  );
  await reportTransactionReceipt(await initialize.wait(), "Initialize FiatTokenV2_2");

  const initializeV2 = await fiatTokenV2_2AtProxy.initializeV2(config.tokenName);
  await reportTransactionReceipt(await initializeV2.wait(), "InitializeV2 FiatTokenV2_2");

  const initializeV2_1 = await fiatTokenV2_2AtProxy.initializeV2_1(config.lostAndFoundAddress);
  await reportTransactionReceipt(await initializeV2_1.wait(), "InitializeV2_1 FiatTokenV2_2");

  const initializeV2_2 = await fiatTokenV2_2AtProxy.initializeV2_2([], config.tokenSymbol);
  await reportTransactionReceipt(await initializeV2_2.wait(), "InitializeV2_2 FiatTokenV2_2");

  const signatureChecker = getQTumContractAt(SignatureChecker__factory, "SignatureChecker");

  Reporter.reportContracts(
    ["SignatureChecker Library", signatureChecker.address],
    ["FiatTokenV2_2 Implementation", fiatTokenV2_2.address],
    ["FiatTokenV2_2 Proxy", fiatTokenProxy.address],
    ["MasterMinter", masterMinter.address],
  );
};
