#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("JhhrH8ufVyDTXer786454mvyixLr6wEEfnEBe5QjS4E");

#[program]
pub mod crud_dapp {
    use super::*;

  pub fn close(_ctx: Context<CloseCrudDapp>) -> Result<()> {
    Ok(())
  }

  pub fn decrement(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.crud_dapp.count = ctx.accounts.crud_dapp.count.checked_sub(1).unwrap();
    Ok(())
  }

  pub fn increment(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.crud_dapp.count = ctx.accounts.crud_dapp.count.checked_add(1).unwrap();
    Ok(())
  }

  pub fn initialize(_ctx: Context<InitializeCrudDapp>) -> Result<()> {
    Ok(())
  }

  pub fn set(ctx: Context<Update>, value: u8) -> Result<()> {
    ctx.accounts.crud_dapp.count = value.clone();
    Ok(())
  }
}

#[derive(Accounts)]
pub struct InitializeCrudDapp<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  init,
  space = 8 + CrudDapp::INIT_SPACE,
  payer = payer
  )]
  pub crud_dapp: Account<'info, CrudDapp>,
  pub system_program: Program<'info, System>,
}
#[derive(Accounts)]
pub struct CloseCrudDapp<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  mut,
  close = payer, // close account and return lamports to payer
  )]
  pub crud_dapp: Account<'info, CrudDapp>,
}

#[derive(Accounts)]
pub struct Update<'info> {
  #[account(mut)]
  pub crud_dapp: Account<'info, CrudDapp>,
}

#[account]
#[derive(InitSpace)]
pub struct CrudDapp {
  count: u8,
}
