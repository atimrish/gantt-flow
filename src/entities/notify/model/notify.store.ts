import {makeAutoObservable} from "mobx";
import {Notify} from "@src/entities/notify/model/model";

export class NotifyStore {
    notifies: Notify[] = []

    constructor() {
        makeAutoObservable(this)
    }

    push(notify: Notify) {
        this.notifies = [...this.notifies, notify]
    }

    delete(id: number) {
        this.notifies = this.notifies.filter(i => i.id !== id)
    }
}