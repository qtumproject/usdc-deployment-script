# USDC Deployment Scripts

## Usage

To deploy the USDC contract, first create a `config.json` file in the `deploy/config` folder, based on the `config.example.json` file.

Then, run the following command to generate the typings:

```bash
npm run build
```

The command above fetches the USDC contracts' source code and compiles them with Truffle, instead of using the existing Hardhat in the project, to avoid the USDC contract bytecode mismatch issue. This is related to the following issue: [Hardhat and Truffle with same compiler options compile different bytecode](https://github.com/NomicFoundation/hardhat/issues/1147)

After that, create a `.env` file at the root of the project, based on the `.env.example` file.

Finally, run the following command to deploy the USDC contract on the QTum testnet:

```bash
npm run deploy-qtum-testnet
```

### Advanced Deployment Options

After each contract deployment, the deployed addresses of the contract are saved in the `.migrate.storage.json` file. 
So, in the case where deployment stops at the third step, for example, just comment out the already completed transactions and run the following command to continue the migration process:

```bash
npx hardhat migrate --network qtumTestnet --from 3 --continue
```

> If you run the command above without the `--continue` option, it will remove all previous records from the `.migrate.storage.json` file.

## Implementation Notes

1. Typings are generated based on the artifacts that are created after the Truffle compilation process.
2. [qtum-ethers-wrapper](https://github.com/qtumproject/qtum-ethers) is used for contract deployment and interaction, so almost all features of the [@solarity/hardhat-migrate](https://github.com/dl-solarity/hardhat-migrate) are not supported.
