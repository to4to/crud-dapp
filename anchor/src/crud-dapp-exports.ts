// Here we export some useful types and functions for interacting with the Anchor program.
import { Cluster, PublicKey } from '@solana/web3.js';
import type { CrudDapp } from '../target/types/crud_dapp';
import { IDL as CrudDappIDL } from '../target/types/crud_dapp';

// Re-export the generated IDL and type
export { CrudDapp, CrudDappIDL };

// After updating your program ID (e.g. after running `anchor keys sync`) update the value below.
export const CRUD_DAPP_PROGRAM_ID = new PublicKey(
  'JhhrH8ufVyDTXer786454mvyixLr6wEEfnEBe5QjS4E'
);

// This is a helper function to get the program ID for the CrudDapp program depending on the cluster.
export function getCrudDappProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
    case 'mainnet-beta':
    default:
      return CRUD_DAPP_PROGRAM_ID;
  }
}
