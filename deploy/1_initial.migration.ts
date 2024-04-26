import { deployQTumContract } from "@scripts";

import { Migrations__factory } from "@ethers-v5";

export = async () => {
  await deployQTumContract(Migrations__factory, "Migrations");
};
