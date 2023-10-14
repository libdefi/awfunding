import { MUDChain, latticeTestnet } from '@latticexyz/common/chains';
import { foundry, optimismGoerli, optimism} from '@wagmi/chains';
import { Chain } from '@wagmi/core'

// If you are deploying to chains other than anvil or Lattice testnet, add them here

const taikoTestnetSepolia = {
  id: 167007,
  name: 'JolnirL2',
  network: 'taikoTestnetSepolia',
  nativeCurrency: {
    decimals: 18,
    name: 'JolnirL2',
    symbol: 'ETH',
  },
  rpcUrls: {
    public: { http: ['https://rpc.jolnir.taiko.xyz'] },
    default: { http: ['https://rpc.jolnir.taiko.xyz'] },
  },
  blockExplorers: {
    etherscan: { name: 'Explorer', url: 'https://explorer.jolnir.taiko.xyz' },
    default: { name: 'Explorer', url: 'https://explorer.jolnir.taiko.xyz' },
  },
} as const satisfies Chain;
export const supportedChains: MUDChain[] = [foundry, latticeTestnet, optimismGoerli, optimism, taikoTestnetSepolia];
