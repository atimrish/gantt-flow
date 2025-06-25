import {makeAutoObservable, runInAction} from "mobx";
import {Task} from "@src/entities/task/model/index";
import {getAllTasks} from "@src/features/task/api/getAllTasks";
import {createTask, CreateTaskData} from "@src/features/task/api/createTask";
import {deleteTask} from "@src/features/task/api/deleteTask";

export class TaskStore {
    tasks: Record<string, Task> = {}

    constructor() {
        makeAutoObservable(this)
    }

    async fetch() {
        const tasks = await getAllTasks()
        const fetchedTasks: typeof this.tasks = {}

        tasks.forEach((task) => {
            fetchedTasks[task.id.toString()] = task
        })

        runInAction(() => {
            this.tasks = fetchedTasks
        })
    }

    async add(data: CreateTaskData) {
        return await createTask(data)
    }

    async delete(id: number) {
        await deleteTask(id)
    }
}