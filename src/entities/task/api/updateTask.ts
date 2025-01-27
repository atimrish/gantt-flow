import {getConnection} from "@src/shared/api/indexed-db/indexedDB";
import {TASK_TABLE_NAME} from "@src/entities/task/config";
import {Task} from "@src/entities/task/model";

export const updateTask = async (data: Task): Promise<IDBValidKey | DOMException> => {
    const connection = await getConnection(TASK_TABLE_NAME);
    const transaction = connection.transaction(TASK_TABLE_NAME, 'readwrite')
    const request = transaction.objectStore(TASK_TABLE_NAME).put(data)
    const response: Promise<IDBValidKey | DOMException> = new Promise((res, rej) => {
        request.onsuccess = () => res(request.result)
        request.onerror = () => rej(request.error)
    })
    connection.close()
    return await response
}