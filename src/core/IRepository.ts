export interface IRepository<T> {
    findAll(): Promise<T[]>;
    findUser(name: string): Promise<T | null>;
    findOneById(id: string): Promise<T | null>;
    doesExists(id: string): Promise<boolean>;
    save(entity: T): Promise<void>;
    delete(id: string): Promise<void>;
}