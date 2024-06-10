#![allow(clippy::result_large_err)]

use anchor_lang::{prelude::*, solana_program::address_lookup_table::instruction};

declare_id!("JhhrH8ufVyDTXer786454mvyixLr6wEEfnEBe5QjS4E");

#[program]
pub mod crud_dapp {
    

    use     super::*;


    pub fn create_entry(

        ctx: Context<CreateEntry>,
        title :String,
        message:String,
    )->Result<()>{
        let journal_entry= &mut ctx.accounts.journal_entry;
        journal_entry.owner=ctx.accounts.owner.key();
        journal_entry.title=title;

        journal_entry.message=message;

        Ok(())
    }

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


#[derive(Accounts)]
#[instruction(title:String)]
pub struct CreateEntry<'info>{
     #[account(
        init,
        seeds=[title.as_bytes(),owner.key().as_ref()],
        bump,
        payer=owner,
        space=8+JournalEntryState::INIT_SPACE
     )]



     pub journal_entry:Account<'info,JournalEntryState>,
     #[account(mut)]
     pub owner: Signer<'info>,
     pub system_program:Program<'info,System >,

}