import * as anchor from '@coral-xyz/anchor';
import { Program } from '@coral-xyz/anchor';
import { Keypair } from '@solana/web3.js';
import { CrudDapp } from '../target/types/crud_dapp';

describe('crud-dapp', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const payer = provider.wallet as anchor.Wallet;

  const program = anchor.workspace.CrudDapp as Program<CrudDapp>;

  const crudDappKeypair = Keypair.generate();

  it('Initialize CrudDapp', async () => {
    await program.methods
      .initialize()
      .accounts({
        crudDapp: crudDappKeypair.publicKey,
        payer: payer.publicKey,
      })
      .signers([crudDappKeypair])
      .rpc();

    const currentCount = await program.account.crudDapp.fetch(
      crudDappKeypair.publicKey
    );

    expect(currentCount.count).toEqual(0);
  });

  it('Increment CrudDapp', async () => {
    await program.methods
      .increment()
      .accounts({ crudDapp: crudDappKeypair.publicKey })
      .rpc();

    const currentCount = await program.account.crudDapp.fetch(
      crudDappKeypair.publicKey
    );

    expect(currentCount.count).toEqual(1);
  });

  it('Increment CrudDapp Again', async () => {
    await program.methods
      .increment()
      .accounts({ crudDapp: crudDappKeypair.publicKey })
      .rpc();

    const currentCount = await program.account.crudDapp.fetch(
      crudDappKeypair.publicKey
    );

    expect(currentCount.count).toEqual(2);
  });

  it('Decrement CrudDapp', async () => {
    await program.methods
      .decrement()
      .accounts({ crudDapp: crudDappKeypair.publicKey })
      .rpc();

    const currentCount = await program.account.crudDapp.fetch(
      crudDappKeypair.publicKey
    );

    expect(currentCount.count).toEqual(1);
  });

  it('Set crudDapp value', async () => {
    await program.methods
      .set(42)
      .accounts({ crudDapp: crudDappKeypair.publicKey })
      .rpc();

    const currentCount = await program.account.crudDapp.fetch(
      crudDappKeypair.publicKey
    );

    expect(currentCount.count).toEqual(42);
  });

  it('Set close the crudDapp account', async () => {
    await program.methods
      .close()
      .accounts({
        payer: payer.publicKey,
        crudDapp: crudDappKeypair.publicKey,
      })
      .rpc();

    // The account should no longer exist, returning null.
    const userAccount = await program.account.crudDapp.fetchNullable(
      crudDappKeypair.publicKey
    );
    expect(userAccount).toBeNull();
  });
});
