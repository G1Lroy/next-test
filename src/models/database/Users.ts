import Entity from "./Entity";

export type UserEntity = {
    userName: string,
    password: string
}

class Users extends Entity<UserEntity> {

    public getByUserName(userName: string) {
        return this.data.find(row => row.userName === userName);
    }
    public authenticate(userName: string, password: string): boolean {
        const user = this.getByUserName(userName);
        return user !== undefined && user.password === password;
    }
}

export default Users;