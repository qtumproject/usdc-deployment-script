import { deployQTumContract, getQTumContractAt } from "@scripts";

import { FiatTokenProxy__factory, FiatTokenV2_2__factory, MasterMinter__factory } from "@ethers-v5";

export = async () => {
  const fiatTokenV2_2 = getQTumContractAt(FiatTokenV2_2__factory, "FiatTokenV2_2");

  const fiatTokenProxy = await deployQTumContract(FiatTokenProxy__factory, "FiatTokenProxy", [fiatTokenV2_2.address]);

  await deployQTumContract(MasterMinter__factory, "MasterMinter", [fiatTokenProxy.address]);
};
