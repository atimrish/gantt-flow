import {Task} from "@src/entities/task/model";
import {getConnection} from "@src/shared/api/indexed-db/indexedDB";
import {TASK_TABLE_NAME} from "@src/entities/task/config";

export const createTask = async (data: Omit<Task, 'createdAt'>): Promise<IDBValidKey | DOMException> => {
    const connection = await getConnection(TASK_TABLE_NAME)
    const transaction = connection.transaction(TASK_TABLE_NAME, 'readwrite')
    const request = transaction.objectStore(TASK_TABLE_NAME).add({
        createdAt: new Date(),
        ...data
    })
    const result: Promise<IDBValidKey | DOMException> = new Promise((res, rej) => {
        request.onsuccess = () => res(request.result)
        request.onerror = () => rej(request.error)
    })
    connection.close()
    return await result
}