import {makeAutoObservable} from "mobx";
import {Task} from "@src/entities/task/model/index";
import {getAllTasks} from "@src/entities/task/api/getAllTasks";
import {createTask, CreateTaskData} from "@src/entities/task/api/createTask";

export class TaskStore {
    tasks: Record<string, Task> = {}

    constructor() {
        makeAutoObservable(this)
    }

    async fetch() {
        const tasks = await getAllTasks()
        const fetchedTasks: Record<string, Task> = {}

        tasks.forEach((task) => {
            fetchedTasks[task.id.toString()] = task
        })

        this.tasks = fetchedTasks
    }

    async add(data: CreateTaskData) {
        return await createTask(data)
    }
}