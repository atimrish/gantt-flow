export const getConnection = (tableName: string): Promise<IDBDatabase> => new Promise((res, rej) => {
    const IDB = indexedDB.open(tableName, 1)

    IDB.onupgradeneeded = () => {
        if (IDB.result.objectStoreNames.contains(tableName)) {
            return
        }

        IDB.result.createObjectStore(tableName, {
            keyPath: 'id',
            autoIncrement: true
        })
    }

    IDB.onsuccess = () => {
        res(IDB.result)
    }

    IDB.onerror = () => {
        rej(IDB.error)
    }
})