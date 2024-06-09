#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("JhhrH8ufVyDTXer786454mvyixLr6wEEfnEBe5QjS4E");

#[program]
pub mod crud_dapp {
    use     super::*;

}

#[account]
#[derive(InitSpace)]
pub struct  JournalEntryState{

    pub owner:Pubkey,
    #[max_len(20)]
    pub title: String,
    #[max_len(200)]
    pub message: String,
    pub entry_id: u64,
}