import { deployQTumContract, reportTransactionReceipt } from "@scripts";

import { FiatTokenV2_2__factory, SignatureChecker__factory } from "@ethers-v5";

import { FiatTokenV2_2LibraryAddresses } from "@/generated-types/factories/FiatTokenV2_2__factory";

const THROWAWAY_ADDRESS = "0x000000000000000000000000000000000000000f";

export = async () => {
  const signatureChecker = await deployQTumContract(SignatureChecker__factory, "SignatureChecker");

  const librariesToLink: FiatTokenV2_2LibraryAddresses = {
    __SignatureChecker______________________: signatureChecker.address,
  };

  const tokenBytecode = FiatTokenV2_2__factory.linkBytecode(librariesToLink);

  const fiatTokenV2_2 = await deployQTumContract(
    {
      bytecode: tokenBytecode,
      abi: FiatTokenV2_2__factory.abi,
    },
    "FiatTokenV2_2",
  );

  const initialize = await fiatTokenV2_2.initialize(
    "",
    "",
    "",
    0,
    THROWAWAY_ADDRESS,
    THROWAWAY_ADDRESS,
    THROWAWAY_ADDRESS,
    THROWAWAY_ADDRESS,
    { gasLimit: 8000000 },
  );
  await reportTransactionReceipt(await initialize.wait(), "(Implementation) Initialize FiatTokenV2_2");

  const initializeV2 = await fiatTokenV2_2.initializeV2("", { gasLimit: 8000000 });
  await reportTransactionReceipt(await initializeV2.wait(), "(Implementation) InitializeV2 FiatTokenV2_2");

  const initializeV2_1 = await fiatTokenV2_2.initializeV2_1(THROWAWAY_ADDRESS, { gasLimit: 8000000 });
  await reportTransactionReceipt(await initializeV2_1.wait(), "(Implementation) InitializeV2_1 FiatTokenV2_2");

  const initializeV2_2 = await fiatTokenV2_2.initializeV2_2([], "", { gasLimit: 8000000 });
  await reportTransactionReceipt(await initializeV2_2.wait(), "(Implementation) InitializeV2_2 FiatTokenV2_2");
};
