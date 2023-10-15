# Onchain Funding

The fully onchain crowdfunding protocol is driven by a MUD.

Our goal is to support Web3 builders, especially Autonomous World/Fully onchain games and other Onchain maxi builders, and boost the AW/FOC

This crowdfunding campaign will have a start date and is expected to run for a limited period of 30 days. This is because neither too short nor too long will work. (If you have any objections, you can fork and use it.)

This protocol deployed on taikoTestnetSepolia as a test. See below for more information about [taikoTestnetSepolia](https://taiko.xyz/docs/guides/setup-your-wallet).

WorldAddress(taikoTestnetSepolia): [0xCf68bD835d191a8D922d5Db38520C956058B62Ec](https://explorer.jolnir.taiko.xyz/address/0xCf68bD835d191a8D922d5Db38520C956058B62Ec) 

## Get Started

**Setup an env file on client**

```markdown
cp packages/client/.env.sample packages/client/.env

```

```markdown
VITE_CHAIN_ID=167007 #Jolnir L2
VITE_PRIVATE_KEY=WALLET_PRIVATE_KEY
VITE_RPC_PROVIDER="https://rpc.jolnir.taiko.xyz"

```

**Setup an env file on contracts**

```markdown
cp packages/contracts/.env.sample packages/contracts/.env
```

```markdown
# This .env file is for demonstration purposes only.
#
# This should usually be excluded via .gitignore and the env vars attached to
# your deployment environment, but we're including this here for ease of local
# development. Please do not commit changes to this file!
#
# Anvil default private key:
PRIVATE_KEY=0x[YOUR PRIVATE KE]
```

**This will deploy smart contracts to a local chain and deploy the client. You can also deploy the contracts to the Optimism goerli by running**

```
cd packages/contracts && pnpm deploy:taikoTestnetSepolia

```

**You should return to the project home directory. This project uses pnpm workspaces. To install packages and run, simply run**

```
pnpm install
pnpm dev

```

### Configure Contracts

This project uses [MUD](https://mud.dev/), a solidity library and associated set of client libraries, for smart contracts & client-side onchain state syncing. For more info on MUD, look at [MUD](https://mud.dev/).

## Getting Help

If you have questions, concerns, bug reports, etc, please file an issue in this repository's Issue Tracker.
