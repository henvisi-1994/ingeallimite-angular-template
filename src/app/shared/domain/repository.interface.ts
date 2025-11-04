export interface Repository<T, ID = number | string> {
  findAll(): Promise<T[]>;
  findById(id: ID): Promise<T>;
  create(item: T): Promise<T>;
  update(id: ID, item: T): Promise<T>;
  delete(id: ID): Promise<void>;
}
