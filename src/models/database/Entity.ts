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

        this.data.push({
            id: userId,
            createDate: new Date(Date.now()),
            ...row
        } as BaseEntity<T>)
    }

    public remove(date: Date) {
        const parsedDate = typeof date === 'string' ? new Date(date) : date;
        const dateTimestamp = parsedDate.getTime();

        const rowToRemove = this.data.find(row => {
            const rowDateTimestamp = new Date(row.createDate).getTime(); 
            return rowDateTimestamp === dateTimestamp;
        });

        if (rowToRemove) {
            this.data = this.data.filter(row => new Date(row.createDate).getTime() !== dateTimestamp); 
        }
        
    }

    public getAll() { return this.data }

    public getById(id: number) { return this.data.find(row => row.id === id) }



}

export default Entity;