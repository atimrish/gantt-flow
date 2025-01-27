export type IDBModel<T extends Object> = T & {
    id: IDBValidKey
    createdAt: Date
}