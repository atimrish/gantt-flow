import {getConnection} from "@src/shared/api/indexed-db/indexedDB";
import {TASK_TABLE_NAME} from "@src/entities/task/config";
import {Task} from "@src/entities/task/model";
import {IDBModel} from "@src/shared/model/indexed-db/idb-result";

type ReturnValue = Promise<IDBModel<Task> | undefined>

export const getTaskById = async (id: IDBValidKey): ReturnValue => {
    const connection = await getConnection(TASK_TABLE_NAME)
    const transaction = connection.transaction(TASK_TABLE_NAME)
    const request = transaction.objectStore(TASK_TABLE_NAME).get(id)
    const task: Awaited<ReturnValue> = await new Promise((res, rej) => {
        request.onsuccess = () => res(request.result)
        request.onerror = () => rej(request.error)
    })
    connection.close()
    return task
}