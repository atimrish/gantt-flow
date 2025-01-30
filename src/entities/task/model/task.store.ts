import {makeAutoObservable, runInAction} from "mobx";
import {Task} from "@src/entities/task/model/index";
import {getAllTasks} from "@src/entities/task/api/getAllTasks";
import {createTask, CreateTaskData} from "@src/entities/task/api/createTask";

export class TaskStore {
    tasks: Task[] = []

    constructor() {
        makeAutoObservable(this)
    }

    async fetch() {
        const tasks = await getAllTasks()
        runInAction(() => {
            this.tasks = tasks
        })
    }

    async add(data: CreateTaskData) {
        return await createTask(data)
    }
}