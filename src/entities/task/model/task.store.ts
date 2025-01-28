import {makeObservable} from "mobx";
import {Task} from "@src/entities/task/model/index";
import {getAllTasks} from "@src/entities/task/api/getAllTasks";

export class TaskStore {
    tasks: Task[] = []

    constructor() {
        makeObservable(this)
    }

    async fetch() {
        this.tasks = await getAllTasks()
    }


}