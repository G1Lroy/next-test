export type BaseEntity<T> = {
    id: number,
    createDate: Date
} & Omit<T, 'id'>

export type ModifyBaseEntity<T> = Omit<BaseEntity<T>, 'id' | 'createDate'>;

abstract class Entity<T> {
    constructor(data: BaseEntity<T>[]) {
        this.data = data;
    }

    protected data: BaseEntity<T>[];

    public add(row: ModifyBaseEntity<T>, userId: number) {
        // const lastId = this.data[this.data.length - 1]?.id;

        this.data.push({
            id: userId,
            createDate: new Date(),
            ...row
        } as BaseEntity<T>)
        console.log(this.data)
    }

    public remove(date: string) {

        const rowToRemove = this.data.find(row => row.createDate.toLocaleString() === date);

        if (rowToRemove) {
            this.data = this.data.filter(row => row.createDate.toLocaleString() !== date);
        }

        console.log(this.data);
    }

    public getAll() { return this.data }

    public getById(id: number) { return this.data.find(row => row.id === id) }



}

export default Entity;