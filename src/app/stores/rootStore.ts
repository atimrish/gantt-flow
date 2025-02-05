import {TaskStore} from "@src/entities/task/model";
import {NotifyStore} from "@src/entities/notify/model";

export class RootStore {
    task = new TaskStore()
    notify = new NotifyStore()
}