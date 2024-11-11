// use anchor_lang::prelude::*;

// declare_id!("3dzkgoe5PtYKwJ8zKWQQQTEgQK1VEGpD42uJH7XZqRS3");

// #[program]
// pub mod my_anchor_project {
//     use super::*;

//     pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
//         msg!("Greetings from: {:?}", ctx.program_id);
//         Ok(())
//     }
// }

// #[derive(Accounts)]
// pub struct Initialize {}


use anchor_lang::prelude::*;

declare_id!("EfAYH5dAoH3sx5PW7BqhScec9MQFdMkbSxVxERXvBj4p");

#[program]
pub mod my_program {
    use super::*;
    
    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Program Initialized!");
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 8)]
    pub my_account: Account<'info, MyAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct MyAccount {
    pub data: u64,
}
