import Entity from "./Entity";

export type AccountType = 'FACEBOOK' | 'TIKTOK' | 'TELEGRAM';

export type AccountEntity = {
    amount: number,
    userId: number,
    /** Traffic source account id */
    tfAccountId: string,
    type: AccountType
}

class Accounts extends Entity<AccountEntity> { }

export default Accounts;
