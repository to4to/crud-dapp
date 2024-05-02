'use client';

import { CrudDappIDL, getCrudDappProgramId } from '@crud-dapp/anchor';
import { Program } from '@coral-xyz/anchor';
import { useConnection } from '@solana/wallet-adapter-react';
import { Cluster, Keypair, PublicKey } from '@solana/web3.js';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import toast from 'react-hot-toast';
import { useCluster } from '../cluster/cluster-data-access';
import { useAnchorProvider } from '../solana/solana-provider';
import { useTransactionToast } from '../ui/ui-layout';

export function useCrudDappProgram() {
  const { connection } = useConnection();
  const { cluster } = useCluster();
  const transactionToast = useTransactionToast();
  const provider = useAnchorProvider();
  const programId = useMemo(
    () => getCrudDappProgramId(cluster.network as Cluster),
    [cluster]
  );
  const program = new Program(CrudDappIDL, programId, provider);

  const accounts = useQuery({
    queryKey: ['crud-dapp', 'all', { cluster }],
    queryFn: () => program.account.crudDapp.all(),
  });

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  });

  const initialize = useMutation({
    mutationKey: ['crud-dapp', 'initialize', { cluster }],
    mutationFn: (keypair: Keypair) =>
      program.methods
        .initialize()
        .accounts({ crudDapp: keypair.publicKey })
        .signers([keypair])
        .rpc(),
    onSuccess: (signature) => {
      transactionToast(signature);
      return accounts.refetch();
    },
    onError: () => toast.error('Failed to initialize account'),
  });

  return {
    program,
    programId,
    accounts,
    getProgramAccount,
    initialize,
  };
}

export function useCrudDappProgramAccount({ account }: { account: PublicKey }) {
  const { cluster } = useCluster();
  const transactionToast = useTransactionToast();
  const { program, accounts } = useCrudDappProgram();

  const accountQuery = useQuery({
    queryKey: ['crud-dapp', 'fetch', { cluster, account }],
    queryFn: () => program.account.crudDapp.fetch(account),
  });

  const closeMutation = useMutation({
    mutationKey: ['crud-dapp', 'close', { cluster, account }],
    mutationFn: () =>
      program.methods.close().accounts({ crudDapp: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx);
      return accounts.refetch();
    },
  });

  const decrementMutation = useMutation({
    mutationKey: ['crud-dapp', 'decrement', { cluster, account }],
    mutationFn: () =>
      program.methods.decrement().accounts({ crudDapp: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx);
      return accountQuery.refetch();
    },
  });

  const incrementMutation = useMutation({
    mutationKey: ['crud-dapp', 'increment', { cluster, account }],
    mutationFn: () =>
      program.methods.increment().accounts({ crudDapp: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx);
      return accountQuery.refetch();
    },
  });

  const setMutation = useMutation({
    mutationKey: ['crud-dapp', 'set', { cluster, account }],
    mutationFn: (value: number) =>
      program.methods.set(value).accounts({ crudDapp: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx);
      return accountQuery.refetch();
    },
  });

  return {
    accountQuery,
    closeMutation,
    decrementMutation,
    incrementMutation,
    setMutation,
  };
}
