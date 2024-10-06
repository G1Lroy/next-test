import { Users, Accounts, TopUpRequests } from ".";

class Database {
    public static users: Users = new Users([
        {
            id: 1,
            createDate: new Date('2023-01-01T10:00:00Z'),
            userName: 'alice',
            password: 'password123',
        },
        {
            id: 2,
            createDate: new Date('2023-01-02T10:00:00Z'),
            userName: 'bob',
            password: 'securepassword',
        },
        {
            id: 3,
            createDate: new Date('2023-01-03T10:00:00Z'),
            userName: 'charlie',
            password: 'mypassword',
        },
    ]);

    public static topUpRequests: TopUpRequests = new TopUpRequests([
        {
            id: 1,
            createDate: new Date(Date.now() + 1),
            amount: 50,
            accountId: 101,
            userId: 1,
        },
        {
            id: 2,
            createDate: new Date(Date.now()),
            amount: 100,
            accountId: 102,
            userId: 2,
        },
    ]);

    public static accounts: Accounts = new Accounts([
        {
            id: 1,
            createDate: new Date('2023-01-01T10:00:00Z'),
            amount: 200,
            tfAccountId: '123',
            userId: 1,
            type: 'FACEBOOK'
        },
        {
            id: 2,
            createDate: new Date('2023-01-01T10:00:00Z'),
            amount: 300,
            tfAccountId: '1234',
            userId: 2,
            type: 'TIKTOK'
        },
        {
            id: 3,
            createDate: new Date('2023-01-01T10:00:00Z'),
            amount: 150,
            tfAccountId: '12345',
            userId: 3,
            type: 'TELEGRAM'
        },
    ]);
    public static authenticate(username: string, password: string): boolean {
        return this.users.authenticate(username, password);
    }
}



export default Database;