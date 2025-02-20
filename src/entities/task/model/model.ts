import {IDBModel} from "@src/shared/model/indexed-db/idb-result";

export type Task = IDBModel<{
    name: string
    start: string
    end: string
    description?: string
    completed: boolean
    progress: number
    color?: string
}>